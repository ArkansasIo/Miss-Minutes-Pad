import express from 'express';import cors from 'cors';import 'dotenv/config';import {query} from './db.js';
const app=express();app.use(cors({origin:(process.env.CORS_ORIGINS??'').split(',').map(x=>x.trim()).filter(Boolean)}));app.use(express.json({limit:'32kb'}));
app.get('/api/health',async(_req,res)=>{try{await query('SELECT 1');res.json({status:'online',service:'miss-minutes-api'})}catch{res.status(503).json({status:'degraded',service:'miss-minutes-api'})}});
app.post('/api/agent/chat',async(req,res)=>{const message=typeof req.body?.message==='string'?req.body.message.trim():'';if(!message)return res.status(400).json({error:{code:'VALIDATION_ERROR',message:'message is required'}});const reply=`Temporal request received: ${message}`;await query('INSERT INTO agent_events(event_type,metadata) VALUES (?,?)',['chat',JSON.stringify({message})]);res.json({reply})});
app.get('/api/conversations',async(_req,res)=>res.json(await query('SELECT id,title,created_at,updated_at FROM conversations ORDER BY updated_at DESC LIMIT 50')));
app.get('/api/memories',async(_req,res)=>res.json(await query('SELECT id,memory_key,value,created_at FROM memories ORDER BY created_at DESC LIMIT 100')));
app.get('/api/timeline',async(_req,res)=>res.json(await query('SELECT id,event_type,payload,created_at FROM timeline_events ORDER BY created_at DESC LIMIT 100')));
app.get('/api/plugins',async(_req,res)=>res.json(await query('SELECT id,name,version,enabled FROM plugins ORDER BY name')));
const port=Number(process.env.PORT??3000);app.listen(port,()=>console.log(`Miss Minutes API listening on ${port}`));
