import fetch from "node-fetch";
import { expect } from "chai";
import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");

AWS.config.region = process.env.AWS_SERVICE_REGION;

const url = `http://${process.env.TEST_HOST}:${process.env.TEST_PORT}`;
const client = new es.Client({
  hosts: [process.env.ES_URL],
  connectionClass: awsES
});

describe("GET /api/datasets/search", function() {
  this.timeout(10000);

  it("should return datasets.", done => {
    fetch(`${url}/api/datasets/search?q=water`)
      .then(res => res.json())
      .then(res => {
        expect(res.result.length).to.gte(0);
        expect(Object.keys(res.result[0])).to.have.lengthOf(2);
        expect(res.result[0]).to.have.all.keys("type", "dcat");
        done();
      })
      .catch(err => done(err));
  });
});
