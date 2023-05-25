const client = require('prom-client');
const { histogram, gauge, summary, counter } = require('../utils/prometheus');

const register = new client.Registry();

client.collectDefaultMetrics({
  app: 'node-application-monitoring-app',
  prefix: 'node_',
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
  register
});

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

register.registerMetric(httpRequestDurationMicroseconds);

histogram(register);
gauge(register);
summary(register);
counter(register);

const metrics = async (req, res) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
    end({ route, code: res.statusCode, method: req.method });
};

module.exports = { metrics };