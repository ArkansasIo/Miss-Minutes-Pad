import 'dotenv/config';import {query,pool} from './db.js';
async function run(){await query('INSERT INTO agent_events(event_type,metadata) VALUES (?,?)',['scheduled_maintenance',JSON.stringify({at:new Date().toISOString()})]);console.log('scheduled maintenance complete');await pool.end()}
run().catch(async e=>{console.error(e);await pool.end();process.exit(1)});
