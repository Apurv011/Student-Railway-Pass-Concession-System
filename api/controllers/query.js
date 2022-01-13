const mongoose = require('mongoose');
const Query = require('../models/query');

exports.getAllQueries = (req, res, next) => {
  Query
      .find()
      .select('_id userId userName date que ans isAns email branch')
      .exec()
      .then(queries => {
          res.status(200).json({
              count: queries.length,
              queries: queries
          });
      })
      .catch(error => {
          next(error);
      })
};


exports.getAllUnAnsQueries = (req, res, next) => {
  Query
      .find({isAns: false})
      .select('_id userId userName date que ans isAns email branch')
      .exec()
      .then(queries => {
          res.status(200).json({
              count: queries.length,
              queries: queries
          });
      })
      .catch(error => {
          next(error);
      })
};

exports.getAllAnsQueries = (req, res, next) => {
  Query
      .find({isAns: true})
      .select('_id userId userName date que ans isAns email branch')
      .exec()
      .then(queries => {
          res.status(200).json({
              count: queries.length,
              queries: queries
          });
      })
      .catch(error => {
          next(error);
      })
};

exports.getAllUserQueries = (req, res, next) => {
  const uId = req.params.uId;
  Query
      .find({userId: uId})
      .select('_id userId userName date que ans isAns email branch')
      .exec()
      .then(queries => {
          res.status(200).json({
              count: queries.length,
              queries: queries
          });
      })
      .catch(error => {
          next(error);
      })
};

exports.AddNewQuery = (req, res, next) => {

    return new Query({
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        userName: req.body.userName,
        que: req.body.que,
        email: req.body.email,
        branch: req.body.branch,
    })
    .save()
    .then(result => {
        res.status(200).json({
            query: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.deleteQuery = (req, res, next) => {
    const queryId = req.params.queryId;
    Query
        .remove({ _id: queryId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Query Deleted Successfully!'
            });
        })
        .catch(error => {
            error.message = 'Could Not Delete Query!';
            next(error);
        });
};

exports.updateQuery = (req, res, next) => {
    const queryId = req.params.queryId;

    Query
      .update({ _id: queryId }, { $set: req.body })
      .exec()
      .then(updatedQuery => {
          res.status(200).json({
      message: 'Updated Query Successfully!',
      query: updatedQuery
    });
      })
      .catch(err => {
          next(err);
      });

};
