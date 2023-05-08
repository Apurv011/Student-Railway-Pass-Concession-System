const mongoose = require('mongoose');
const Pass = require('../models/pass');
const fs = require('fs');

exports.getAllPass = (req, res, next) => {
    Pass
        .find()
        .select('_id dob userId branch name age gender source destination class email collegeID contactNo duration collegeIDImage status issueDate')
        .exec()
        .then(passes => {
            res.status(200).json({
                count: passes.length,
                passes: passes
            });
        })
        .catch(error => {
            next(error);
        })
};

exports.CreateOnePass = (req, res, next) => {

    return new Pass({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        userId: req.body.userId,
        remark: req.body.remark,
        age: req.body.age,
        gender: req.body.gender,
        source: req.body.source,
        destination: req.body.destination,
        branch: req.body.branch,
        class: req.body.class,
        email: req.body.email,
        collegeID: req.body.collegeID,
        contactNo: req.body.contactNo,
        duration: req.body.duration,
        status: req.body.status,
        dob: req.body.dob,
        collegeIDImage: req.body.collegeIDImage
    })
    .save()
    .then(result => {
        res.status(200).json({
            pass: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.getOneUserPass = (req, res, next) => {
    const userId = req.params.userId;
    Pass
        .find({userId: userId})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json(pass);
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassPending = (req, res, next) => {
    Pass
        .find({$or: [{status: "To be verified by college"},{status: "Re-Applied, To be verified by college"}, {status: "Pass experied, Re-Applied"}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};


exports.getPassVerified = (req, res, next) => {
    Pass
        .find({status: "Verified by college"})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedBranch = (req, res, next) => {
  const branch = req.params.branch;
    Pass
        .find({$and: [{status: "Verified by college"}, {branch: branch}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedSrc = (req, res, next) => {
  const src = req.params.src;
    Pass
        .find({$and: [{status: "Verified by college"}, {source: src}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getClassPass = (req, res, next) => {
    const cls = req.params.cls;
    Pass
        .find({class: cls})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getDurationPass = (req, res, next) => {
    const dur = req.params.dur;
    Pass
        .find({duration: dur})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedDest = (req, res, next) => {
  const dest = req.params.dest;
    Pass
        .find({$and: [{status: "Verified by college"}, {destination: dest}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedGender = (req, res, next) => {
  const gen = req.params.gen;
    Pass
        .find({$and: [{status: "Verified by college"}, {gender: gen}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedSrcGender = (req, res, next) => {
  const src = req.params.src;
  const gen = req.params.gen;
    Pass
        .find({$and: [{status: "Verified by college"}, {source: src}, {gender: gen}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedSrcBranch = (req, res, next) => {
  const src = req.params.src;
  const branch = req.params.branch;
    Pass
        .find({$and: [{status: "Verified by college"}, {source: src}, {branch: branch}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerifiedGenBranch = (req, res, next) => {
  const gen = req.params.gen;
  const branch = req.params.branch;
    Pass
        .find({$and: [{status: "Verified by college"}, {gender: gen}, {branch: branch}]})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassRejected = (req, res, next) => {
    Pass
        .find({status: "Rejected by college"})
        .select('_id dob remark branch userId name age gender source destination class email collegeID contactNo duration collegeIDImage issueDate status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.updatePass = (req, res, next) => {
  const passId = req.params.passId;
  Pass
    .update({ _id: passId }, { $set: req.body })
    .exec()
    .then(updatedPass => {
        res.status(200).json({
    message: 'Updated Pass Successfully!',
    pass: updatedPass
  });
    })
    .catch(err => {
        next(err);
    });

};
