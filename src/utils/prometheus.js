const cluster = require('cluster');
const promClient = require('prom-client');

const histogram = (register) => {
    const h = new promClient.Histogram({
        name: 'node_my_sample_histogram',
        help: 'This is my sample histogram',
        labelNames: ['code'],
        buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    });

    const hc = new promClient.Histogram({
        name: 'node_my_custom_histogram',
        help: 'This is my custom histogram',
        labelNames: ['code', 'color'],
        buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    });
    
    setTimeout(() => {
        h.labels('200').observe(Math.random());
        h.labels('300').observe(Math.random());
        hc.labels('200', 'blue').observe(Math.random());
        hc.labels('300', 'red').observe(Math.random());
        hc.labels('300', 'blue').observe(Math.random());
        hc.labels('200', 'red').observe(Math.random());
    }, 10);

    register.registerMetric(h);
    register.registerMetric(hc);
};

const gauge = (register) => {
    const g = new promClient.Gauge({
        name: 'node_my_gauge',
        help: 'This is my gauge',
        labelNames: ['code'],
        buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    });
    
    setInterval(() => {
        g.set({ code: 200 }, Math.random());
        g.set(Math.random());
        g.labels('300').inc();
        g.inc();
        g.set(22);
    }, 100);
    
    register.registerMetric(g);
};

const summary = (register) => {
    const s = new promClient.Summary({
        name: "node_my_summary",
        help: "This is my summary",
        percentiles: [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999]
     });
    
     register.registerMetric(s);
};

const counter = (register) => {
    const c = new promClient.Counter({
        name: 'node_my_counter',
        help: 'This is my counter',
        labelNames: ['code'],
    });
    
    const sc = new promClient.Counter({
        name: 'node_my_scrape_counter',
        help: 'Number of scrapes (example of a counter with a collect fn)',
        collect() {
            this.inc();
        },
    });
    
    setInterval(() => {
        c.inc({ code: 200 });
        c.inc({ code: 400 });
        c.inc();
        c.reset();
        c.inc(15);
        c.inc({ code: 200 }, Math.random());
        c.labels('200').inc(Math.random());
    }, 5000);
    
    if (cluster.isWorker) {
        setInterval(() => {
            c.inc({ code: `worker_${cluster.worker.id}` });
        }, 2000);
    }

    register.registerMetric(c);
    register.registerMetric(sc);
};

module.exports = { histogram, gauge, summary, counter };