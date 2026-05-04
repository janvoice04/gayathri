const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")
const jwt = require("jsonwebtoken")
require("dotenv").config()

app.listen(3000, () => {
    console.log("Hey Raj! Your backend server is running on port:3000")
})



const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ msg: "No token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY_123");

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


app.use(cors())
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Failed:", err.message);
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err.message);
});

mongoose.connection.on("connected", () => {
  console.log("DB Connected Successfully");
});


const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phoneno: String,
    role: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const reportschema = mongoose.Schema({
    issue_name: String,
    issue_description: String,
    issue_image: String,
    issue_status: {
        type: String,
        default: "Pending"
    },
    issue_date: {
        type: Date,
        default: Date.now
    },
    issue_address: String,
    userId: String
})

const userModel = mongoose.model(
  "janVoice_users",
  userSchema,
  "janVoice_users"
)

const reportModel = mongoose.model(
  "janVoice_reports",  
  reportschema,
  "janVoice_reports"  
);


app.get("/check-users", async (req, res) => {
  const users = await mongoose.connection.db
    .collection("janVoice_users")
    .find()
    .toArray();

  res.json(users);
})


app.get("/getAllIssues", async (req, res) => {
  try {
    const data = await reportModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/register", (req, res) => {
    const new_user = new userModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phoneno: req.body.phoneno,
        role: req.body.role
    })

    new_user.save().then(() => {
        res.json({ success: true })
    })
})


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user || user.password !== password) {
    return res.json({ success: false, msg: "Invalid credentials" });
  }

  if (user.role !== "admin") {
    return res.json({ success: false, msg: "Not admin" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRET_KEY_123",
    { expiresIn: "1d" }
  );

  res.json({ success: true, user, token });
});

app.post("/addIssue", upload.single("issue_image"), (req, res) => {
    const new_report = new reportModel({
        issue_name: req.body.issue_name,
        issue_description: req.body.issue_description,
        issue_image: `/uploads/${req.file.filename}`,
        issue_address: req.body.issue_address,
        userId: req.body.userId
    })

    new_report.save().then(() => {
        res.json({ msg: "success" })
    })
})


app.get("/getAllUsers",  verifyToken,async (req, res) => {
  try {
    const users = await mongoose.connection.db
      .collection("janVoice_users")
      .find()
      .toArray();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


app.get("/getmyIssues/:id", (req, res) => {
    reportModel.find({ userId: req.params.id })
        .then((data) => {
            res.json(data)
        })
})


app.post("/updateIssue", async (req, res) => {
  try {
    const issueId = req.body.issueId;

    console.log("ID RECEIVED:", issueId);

    const data = await reportModel.findById(issueId);

    console.log("FOUND:", data);

    if (!data) {
      return res.status(404).json({ msg: "Issue not found" });
    }

    if (data.issue_status === "Pending") {
      await reportModel.updateOne(
        { _id: issueId },
        { $set: { issue_status: "Assigned" } }
      );
      return res.json({ msg: "Assigned" });
    }

    if (data.issue_status === "Assigned") {
      await reportModel.updateOne(
        { _id: issueId },
        { $set: { issue_status: "Resolved" } }
      );
      return res.json({ msg: "Resolved" });
    }

    return res.json({ msg: "Already resolved" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


app.post("/deleteIssue", (req, res) => {
    reportModel.findByIdAndDelete(req.body.issueId)
    .then((data) => {
        res.json({msg:"issue deleted", data})
    })
})


app.post("/getIssuesByStatus", (req, res) => {
    if(req.body.issue_status === "all"){
        reportModel.find().then((data) => res.json(data))
    } else {
        reportModel.find({issue_status:req.body.issue_status})
        .then((data) => res.json(data))
    }
})


app.post("/getmyIssuesByStatus", (req, res) => {
    if(req.body.issue_status === "all"){
        reportModel.find({userId:req.body.userId})
        .then((data) => res.json(data))
    } else {
        reportModel.find({
          issue_status:req.body.issue_status,
          userId:req.body.userId
        }).then((data) => res.json(data))
    }
})