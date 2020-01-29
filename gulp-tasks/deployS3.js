var AWS = require('aws-sdk');
var fs = require('fs');
var config = require('../config.json');

/**
 * Push the JSON file to S3
 * @see https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
 * @param None
 */
module.exports = function(gulp) {
  return async function deployS3(){

    //console.log('Starting process')

    //console.log(config['aws']['credentials_path'])

    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html
    await AWS.config.loadFromPath(config['aws']['credentials_path']);

    // Create S3 service object
    var s3 = new AWS.S3({apiVersion: '2006-03-01'});

    var uploadParams = {Bucket: config['aws']['deploy_bucket'], Key: '', Body: '', ContentType: 'application/json'};
    var jsonFile = './app/data/_build.json';

    // Configure the file stream and obtain the upload parameters
    var fileStream = fs.createReadStream(jsonFile);
    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = config['arc_composer']['content_id']+'.json';

    // call S3 to retrieve upload file to specified bucket
    await s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
      }
    });
  };
};
