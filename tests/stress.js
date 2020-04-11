import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export default function() {
    const gameId = Math.floor(Math.random() * 10000000);
    const page = Math.floor(Math.random() * 2);
    check(http.get(`http://localhost:3000/api/recent-news/${gameId}/updates?page=${page}`), {
        'status is 200': r => r.status == 200,
        'transaction time < 1000ms': r => r.timings.duration < 1000,
    }) || errorRate.add(1);
    sleep(1.0);
}
