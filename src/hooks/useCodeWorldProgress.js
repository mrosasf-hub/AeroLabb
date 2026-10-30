import { useMemo, useState } from 'react'
import { codeWorldMissions } from '../data/codeWorld.js'

const KEY='aerolab-codeworld-v1'
const initial={ completed:[], fragments:[], lastMission:'cw-01', visits:0 }
function load(){
  try { return { ...initial, ...(JSON.parse(localStorage.getItem(KEY)) || {}) } }
  catch { return initial }
}
function save(value){ localStorage.setItem(KEY,JSON.stringify(value)); return value }

export function useCodeWorldProgress(){
  const [worldProgress,setWorldProgress]=useState(load)
  const update=(fn)=>setWorldProgress((current)=>save(fn(current)))
  const completeWorldMission=(mission)=>update((current)=>{
    if(current.completed.includes(mission.id)) return {...current,lastMission:mission.id}
    return {...current,completed:[...current.completed,mission.id],fragments:[...new Set([...current.fragments,mission.reward])],lastMission:mission.id}
  })
  const touchWorldMission=(id)=>update((current)=>({...current,lastMission:id,visits:(current.visits||0)+1}))
  const resetCodeWorld=()=>setWorldProgress(save(initial))
  const percent=useMemo(()=>Math.round((worldProgress.completed.length/codeWorldMissions.length)*100),[worldProgress.completed.length])
  const completedAll=worldProgress.completed.length===codeWorldMissions.length
  return { worldProgress,completeWorldMission,touchWorldMission,resetCodeWorld,percent,completedAll }
}
