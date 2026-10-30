import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { codeWorldMissions, isCodeWorldUnlocked } from '../data/codeWorld.js'

const v3 = new THREE.Vector3()
const cameraTarget = new THREE.Vector3()

const BLOCKERS = [
  { x1: -24.8, x2: -15.2, z1: -21.4, z2: -12.6 },
  { x1: -5.4, x2: 5.4, z1: -25.6, z2: -18.0 },
  { x1: 18.2, x2: 29.8, z1: 1.3, z2: 10.7 },
  { x1: 6.0, x2: 20.0, z1: 16.3, z2: 27.2 },
  { x1: -16.6, x2: -9.3, z1: 17.0, z2: 27.0 },
]

function blockedAt(x, z) {
  if (Math.hypot(x, z) < 4.8) return true
  return BLOCKERS.some((b) => x > b.x1 && x < b.x2 && z > b.z1 && z < b.z2)
}

const EVENT_TARGETS = {
  comms: [-20, 5, -17],
  generator: [0, 3, -21],
  door: [0, 2, -17.3],
  plant: [20, 1.5, -12],
  motors: [23, 2.2, 5],
  rise: [23, 5, 5],
  scan: [23, 6, 5],
  patrol: [23, 5, 5],
  return: [23, 2, 5],
  light: [13, 4, 21],
  tower: [-12, 7, 22],
  sync: [0, 3, 0],
  core: [0, 4, 0],
}

function useLabelTexture(text, accent = '#50ddff') {
  return useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 768
    canvas.height = 180
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, 'rgba(4,22,35,.93)')
    gradient.addColorStop(.78, 'rgba(4,22,35,.84)')
    gradient.addColorStop(1, 'rgba(4,22,35,.15)')
    ctx.fillStyle = gradient
    ctx.roundRect(0, 12, 750, 156, 36)
    ctx.fill()
    ctx.strokeStyle = accent
    ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(28, 148); ctx.lineTo(690, 148); ctx.stroke()
    ctx.font = '900 50px Inter, Arial, sans-serif'
    ctx.fillStyle = '#f7fcff'
    ctx.fillText(text.toUpperCase(), 36, 84)
    ctx.font = '700 24px Inter, Arial, sans-serif'
    ctx.fillStyle = accent
    ctx.fillText('AEROLAB · CODEWORLD', 38, 126)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    return texture
  }, [text, accent])
}

function ZoneLabel({ text, position, accent, scale = 5 }) {
  const texture = useLabelTexture(text, accent)
  if (!texture) return null
  return <sprite position={position} scale={[scale, scale * .235, 1]}>
    <spriteMaterial map={texture} transparent depthWrite={false} />
  </sprite>
}

function WindowStrip({ position, size = [3, .55, .08], accent = '#54dfff', active = false }) {
  return <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={active ? accent : '#5e7e8f'} emissive={accent} emissiveIntensity={active ? 1.25 : .08} metalness={.2} roughness={.25} />
  </mesh>
}

function FacadeGlass({ position, size = [1.2, 1.1, .09], accent = '#58ddf4', active = false }) {
  return <group position={position}>
    <mesh castShadow><boxGeometry args={size} /><meshStandardMaterial color="#163c50" metalness={.58} roughness={.18} /></mesh>
    <mesh position={[0, 0, size[2] * .56]}><boxGeometry args={[size[0] * .82, size[1] * .82, .025]} /><meshStandardMaterial color={active ? '#7cecff' : '#4f9cb1'} emissive={accent} emissiveIntensity={active ? .75 : .16} transparent opacity={.88} /></mesh>
    <mesh position={[0, size[1] * .5 + .07, size[2] * .62]}><boxGeometry args={[size[0] + .12, .09, .08]} /><meshStandardMaterial color="#e8f3f4" metalness={.28} /></mesh>
  </group>
}

function FacadeRib({ position, height = 3, color = '#d8e7e8' }) {
  return <mesh position={position} castShadow><boxGeometry args={[.16, height, .22]} /><meshStandardMaterial color={color} metalness={.24} roughness={.34} /></mesh>
}

function GroundRing({ position = [0, .08, 0], inner = 1, outer = 1.2, color = '#67e4f4', opacity = .72 }) {
  return <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[inner, outer, 48]} /><meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} /></mesh>
}

function SolarRoof({ y = 3, width = 4.5, depth = 3.6, active = false }) {
  return <group position={[0, y, 0]} rotation={[-.16, 0, 0]}>
    {[-1, 1].map((x) => <mesh key={x} position={[x * width * .24, 0, 0]}>
      <boxGeometry args={[width * .43, .1, depth]} />
      <meshStandardMaterial color={active ? '#174a75' : '#344d61'} emissive={active ? '#1eb9ff' : '#000'} emissiveIntensity={active ? .22 : 0} metalness={.5} roughness={.22} />
    </mesh>)}
  </group>
}

function CommunicationCenter({ active }) {
  const dish = useRef()
  useFrame(({ clock }) => { if (dish.current && active) dish.current.rotation.y = clock.elapsedTime * .42 })
  return <group position={[-20, 0, -17]}>
    <mesh position={[0, .22, 0]} receiveShadow><cylinderGeometry args={[4.75, 4.95, .42, 12]} /><meshStandardMaterial color="#b9d1d3" roughness={.72} /></mesh>
    <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[3.6, 4.3, 3.8, 10]} />
      <meshStandardMaterial color="#edf6f7" roughness={.34} metalness={.16} />
    </mesh>
    <mesh position={[0, 3.86, 0]}>
      <cylinderGeometry args={[3.25, 3.25, .18, 10]} />
      <meshStandardMaterial color="#26b9d5" emissive="#26d5ed" emissiveIntensity={active ? 1.25 : .12} />
    </mesh>
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <group key={i} position={[Math.sin(a) * 3.72, 1.95, Math.cos(a) * 3.72]} rotation={[0, a, 0]}><FacadeRib position={[0, 0, 0]} height={3.25} color="#d7e8e9" /><mesh position={[0, -.15, .14]}><boxGeometry args={[.52, 1.12, .035]} /><meshStandardMaterial color="#4e91a4" emissive="#47d8f0" emissiveIntensity={active ? .75 : .12} metalness={.3} /></mesh></group> })}
    <WindowStrip position={[0, 2, 3.15]} size={[4.5, .68, .08]} active={active} />
    <mesh position={[0, 1.2, 3.6]} castShadow><boxGeometry args={[1.4, 2.3, .3]} /><meshStandardMaterial color="#19394d" emissive={active ? '#28d8ff' : '#000'} emissiveIntensity={active ? .3 : 0} /></mesh>
    <mesh position={[0, .48, 3.72]}><boxGeometry args={[2.2, .1, .12]} /><meshStandardMaterial color="#5ce8f4" emissive="#42dff2" emissiveIntensity={active ? 1.4 : .24} /></mesh>
    <group ref={dish} position={[0, 7.2, 0]}>
      <mesh rotation={[0, 0, .35]}><cylinderGeometry args={[.12, .18, 6.2, 10]} /><meshStandardMaterial color="#e7f6ff" metalness={.55} /></mesh>
      <mesh position={[0, 2.8, 0]} rotation={[Math.PI / 2.65, 0, 0]}>
        <sphereGeometry args={[1.45, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d8edf7" side={THREE.DoubleSide} metalness={.35} roughness={.25} />
      </mesh>
      <mesh position={[0, 3.25, .45]}><sphereGeometry args={[.22, 12, 10]} /><meshStandardMaterial color="#51e6ff" emissive="#37d9ff" emissiveIntensity={active ? 3 : .2} /></mesh>
    </group>
    <ZoneLabel text="Comunicaciones" position={[0, 5.1, 3.2]} accent="#47d7ff" scale={5.1} />
  </group>
}

function EnergyLab({ active, doorOpen }) {
  const coils = useRef([])
  const turbine = useRef()
  useFrame(({ clock }) => {
    if (active) coils.current.forEach((coil, i) => { if (coil) coil.rotation.y = clock.elapsedTime * (.5 + i * .12) })
    if (turbine.current) turbine.current.rotation.y = clock.elapsedTime * (active ? 2.4 : .42)
  })
  return <group position={[0, 0, -22]}>
    <mesh position={[0, .22, 0]} receiveShadow><boxGeometry args={[10.5, .42, 7.5]} /><meshStandardMaterial color="#b8cdd0" roughness={.68} /></mesh>
    <mesh position={[0, 2.2, 0]} castShadow receiveShadow><boxGeometry args={[9.5, 4.4, 6.5]} /><meshStandardMaterial color="#f3f4ef" roughness={.34} metalness={.2} /></mesh>
    <mesh position={[0, 4.55, -.5]} castShadow><boxGeometry args={[7.5, .65, 5.2]} /><meshStandardMaterial color="#f0bd45" emissive="#ffb02e" emissiveIntensity={active ? .75 : .08} /></mesh>
    <SolarRoof y={5.15} width={6.8} depth={4.2} active={active} />
    {[-4.35, 4.35].map((x) => <FacadeRib key={x} position={[x, 2.25, 3.31]} height={4.05} color="#d5e4e4" />)}
    <FacadeGlass position={[-2.55, 2.75, 3.31]} size={[2.15, 1.35, .1]} accent="#ffc75a" active={active} />
    <FacadeGlass position={[2.55, 2.75, 3.31]} size={[2.15, 1.35, .1]} accent="#ffc75a" active={active} />
    <mesh position={[0, 4.02, 3.34]}><boxGeometry args={[3.15, .18, .12]} /><meshStandardMaterial color="#eab64e" emissive="#f4b73d" emissiveIntensity={active ? .8 : .15} /></mesh>
    <mesh position={[0, .48, 3.52]}><boxGeometry args={[3.8, .14, .18]} /><meshStandardMaterial color="#1d4657" emissive="#38d9ee" emissiveIntensity={active ? 1.2 : .15} /></mesh>
    <group position={[-3.5, 5.2, -1.6]} rotation={[0, .2, 0]}><mesh><boxGeometry args={[1.2, .32, 1.2]} /><meshStandardMaterial color="#657d88" metalness={.6} /></mesh><mesh position={[0,.22,0]}><cylinderGeometry args={[.38,.38,.08,12]}/><meshStandardMaterial color="#ffce69" emissive="#ffad32" emissiveIntensity={active?1.2:.1}/></mesh><group ref={turbine} position={[0,.34,0]}>{[0,1,2].map(i=><mesh key={i} position={[0,.34,0]} rotation={[0,0,i*Math.PI*2/3]}><boxGeometry args={[.16,.78,.08]}/><meshStandardMaterial color="#e5f3f4" metalness={.4}/></mesh>)}</group></group>
    <group position={[0, 1.45, 3.36]}>
      <mesh position={[doorOpen ? -1.25 : -.62, 0, 0]}><boxGeometry args={[1.18, 2.9, .18]} /><meshStandardMaterial color="#233e51" emissive={doorOpen ? '#f6b536' : '#000'} emissiveIntensity={doorOpen ? .15 : 0} /></mesh>
      <mesh position={[doorOpen ? 1.25 : .62, 0, 0]}><boxGeometry args={[1.18, 2.9, .18]} /><meshStandardMaterial color="#233e51" emissive={doorOpen ? '#f6b536' : '#000'} emissiveIntensity={doorOpen ? .15 : 0} /></mesh>
    </group>
    <group position={[0, .35, -4.2]}>
      {[0, 1, 2].map((i) => <mesh ref={(node) => { coils.current[i] = node }} key={i} position={[(i - 1) * 2.2, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.72, .12, 10, 28]} /><meshStandardMaterial color="#ffca62" emissive="#ff9f1e" emissiveIntensity={active ? 2 : .16} />
      </mesh>)}
    </group>
    <ZoneLabel text="Laboratorio de energía" position={[0, 6.15, 3.2]} accent="#ffbd4a" scale={6.1} />
  </group>
}

function BlossomTree({ position, active = false, index = 0 }) {
  const crown = useRef()
  useFrame(({ clock }) => { if (crown.current) crown.current.rotation.z = Math.sin(clock.elapsedTime * 1.05 + index) * .025 })
  return <group position={position}>
    <mesh position={[0, .75, 0]} castShadow><cylinderGeometry args={[.18, .28, 1.5, 8]} /><meshStandardMaterial color="#806347" /></mesh>
    <group ref={crown} position={[0, 1.9, 0]}>
      {[[-.42, 0, 0], [.35, .15, .08], [0, .42, -.12], [0, -.1, .3]].map((p, i) => <mesh key={i} position={p} castShadow>
        <sphereGeometry args={[.62 - i * .035, 12, 10]} />
        <meshStandardMaterial color={active ? (i % 2 ? '#62e6a6' : '#8cf3be') : '#537b68'} emissive={active ? '#24d985' : '#000'} emissiveIntensity={active ? .18 : 0} />
      </mesh>)}
      {active && [0, 1, 2].map((i) => <mesh key={`flower-${i}`} position={[(i - 1) * .34, .42 - i * .08, .45]}><sphereGeometry args={[.13, 8, 6]} /><meshStandardMaterial color={i === 1 ? '#fff3a6' : '#ff98c5'} emissive="#ff8abb" emissiveIntensity={.35} /></mesh>)}
    </group>
  </group>
}

function DigitalGarden({ active, selective, lowPower }) {
  const trees = lowPower ? 8 : 14
  const waterRings = useRef([])
  useFrame(({clock}) => waterRings.current.forEach((ring,i)=>{ if(ring){ const phase=(clock.elapsedTime*.18+i/3)%1; ring.scale.setScalar(.35+phase*2.5); ring.material.opacity=(1-phase)*.34 } }))
  return <group position={[21, 0, -14]}>
    <mesh position={[0, .28, 0]} receiveShadow><cylinderGeometry args={[6.7, 7.2, .55, 20]} /><meshStandardMaterial color="#cfe2d2" roughness={.9} /></mesh>
    <mesh position={[0, .59, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[4.6, 5.45, 28]} /><meshStandardMaterial color="#edf5e8" /></mesh>
    <mesh position={[0, .64, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[3.1, 30]} /><meshStandardMaterial color="#4aaac0" transparent opacity={.78} metalness={.12} roughness={.12} /></mesh>
    {[0,1,2].map(i=><mesh key={`ripple-${i}`} ref={n=>waterRings.current[i]=n} position={[0,.66+i*.004,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.6+i*.2,.035,6,28]}/><meshBasicMaterial color="#c4f7ff" transparent opacity={.3} depthWrite={false}/></mesh>)}
    <mesh position={[0,.86,0]}><cylinderGeometry args={[.045,.09,.55,7]}/><meshBasicMaterial color={active?'#c7fff0':'#9ad8dc'} transparent opacity={.7}/></mesh>
    {Array.from({ length: trees }, (_, i) => {
      const angle = (i / trees) * Math.PI * 2
      const radius = i % 2 ? 5.3 : 4.25
      const on = active && (selective || i < Math.ceil(trees * .62))
      return <BlossomTree key={i} index={i} active={on} position={[Math.cos(angle) * radius, .55, Math.sin(angle) * radius]} />
    })}
    <group position={[0, .7, 0]}>
      <mesh position={[0, .65, 0]} castShadow><cylinderGeometry args={[.95, 1.25, 1.3, 12]} /><meshStandardMaterial color="#f3f6ee" /></mesh>
      <mesh position={[0, 1.38, 0]}><sphereGeometry args={[.58, 14, 10]} /><meshStandardMaterial color={active ? '#66efad' : '#738d82'} emissive={active ? '#27e58d' : '#000'} emissiveIntensity={active ? 1.2 : 0} /></mesh>
    </group>
    <ZoneLabel text="Jardín digital" position={[0, 5.5, 1]} accent="#62e6a6" scale={5.2} />
  </group>
}

function Drone({ position = [0, 0, 0], active = false, index = 0, patrol = false }) {
  const ref = useRef()
  const propRefs = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    propRefs.current.forEach((p) => { if (p) p.rotation.y = t * 10 })
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(t * .8 + index) * .35
    if (active) {
      ref.current.position.y = position[1] + 2.6 + Math.sin(t * 2 + index) * .18
      if (patrol) {
        ref.current.position.x = position[0] + Math.cos(t * .35 + index) * (2.8 + index)
        ref.current.position.z = position[2] + Math.sin(t * .35 + index) * (2.8 + index)
      }
    }
  })
  return <group ref={ref} position={position}>
    <mesh castShadow><boxGeometry args={[1.25, .3, .82]} /><meshStandardMaterial color="#edf5ff" metalness={.48} roughness={.2} /></mesh>
    <mesh position={[0, .13, .43]}><boxGeometry args={[.52, .14, .06]} /><meshStandardMaterial color="#a885ff" emissive="#835bff" emissiveIntensity={active ? 1.4 : .15} /></mesh>
    {[[-.82, 0, -.6], [.82, 0, -.6], [-.82, 0, .6], [.82, 0, .6]].map((p, i) => <group key={i} position={p}>
      <mesh><boxGeometry args={[.55, .08, .08]} /><meshStandardMaterial color="#526675" metalness={.6} /></mesh>
      <mesh ref={(node) => { propRefs.current[i] = node }} position={[i % 2 ? .28 : -.28, .02, 0]}><cylinderGeometry args={[.3, .3, .045, 14]} /><meshStandardMaterial color={active ? '#b79aff' : '#758697'} emissive={active ? '#7950ff' : '#000'} emissiveIntensity={active ? .55 : 0} /></mesh>
    </group>)}
  </group>
}

function DroneHangar({ powered, active, lowPower }) {
  return <group position={[24, 0, 6]}>
    <mesh position={[0, .2, 0]} receiveShadow><boxGeometry args={[11.2, .38, 8.8]} /><meshStandardMaterial color="#bacbd7" roughness={.72} /></mesh>
    <mesh position={[0, 2.4, 0]} castShadow receiveShadow><boxGeometry args={[10.5, 4.8, 8]} /><meshStandardMaterial color="#e8edf5" roughness={.32} metalness={.22} /></mesh>
    <mesh position={[0, 4.9, 0]}><boxGeometry args={[9.2, .32, 6.8]} /><meshStandardMaterial color="#a781ff" emissive="#754bff" emissiveIntensity={powered ? .7 : .1} /></mesh>
    {[-4.85,4.85].map((x)=><FacadeRib key={x} position={[x,2.35,4.08]} height={4.5} color="#cbd9e7"/>)}
    <mesh position={[0, 2.05, 4.06]}><boxGeometry args={[6.4, 3.45, .16]} /><meshStandardMaterial color="#26374b" emissive={powered ? '#7256ff' : '#000'} emissiveIntensity={powered ? .15 : 0} /></mesh>
    <mesh position={[0, .38, 4.18]}><boxGeometry args={[7.4, .16, .24]} /><meshStandardMaterial color="#b38cff" emissive="#a16aff" emissiveIntensity={powered ? 1.4 : .16}/></mesh>
    {[-2.5,0,2.5].map((x)=><mesh key={x} position={[x,4.05,4.1]}><boxGeometry args={[1.5,.16,.12]}/><meshStandardMaterial color="#e5d9ff" emissive="#a987ff" emissiveIntensity={powered?.8:.12}/></mesh>)}
    <mesh position={[0, .08, 8.2]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[1.4,1.58,28]}/><meshBasicMaterial color="#b99aff" transparent opacity={.72}/></mesh>
    {[-3.4, 3.4].map((x) => <WindowStrip key={x} position={[x, 3.05, 4.09]} size={[1.8, .75, .08]} accent="#b794ff" active={powered} />)}
    <Drone position={[-2.8, .75, 2.4]} active={powered} patrol={active} />
    {!lowPower && <Drone position={[2.8, .75, 1.8]} active={active} patrol={active} index={1} />}
    <ZoneLabel text="Hangar de drones" position={[0, 6.15, 2.8]} accent="#b58cff" scale={5.7} />
  </group>
}

function DataTower({ position, height, accent, active, index }) {
  const ref = useRef()
  useFrame(({ clock }) => { if (ref.current && active) ref.current.material.emissiveIntensity = .35 + Math.sin(clock.elapsedTime * 1.5 + index) * .15 })
  return <group position={position}>
    <mesh position={[0, height / 2, 0]} castShadow receiveShadow><boxGeometry args={[2.1, height, 2.1]} /><meshStandardMaterial color="#eaf0f4" roughness={.28} metalness={.3} /></mesh>
    <mesh position={[0, height / 2, 1.08]}><boxGeometry args={[1.72, height * .83, .055]} /><meshStandardMaterial color="#183c54" metalness={.42} roughness={.2}/></mesh>
    <mesh ref={ref} position={[0, height / 2 + .15, 1.12]}><boxGeometry args={[1.35, height * .64, .06]} /><meshStandardMaterial color={active ? accent : '#6b7f88'} emissive={accent} emissiveIntensity={active ? .55 : .05} /></mesh>
    {Array.from({length:Math.max(2,Math.floor(height/1.5))},(_,i)=><mesh key={i} position={[0,(i+1)*height/(Math.max(2,Math.floor(height/1.5))+1),1.17]}><boxGeometry args={[1.8,.055,.07]}/><meshStandardMaterial color="#b8d5dc" emissive={accent} emissiveIntensity={active?.55:.08}/></mesh>)}
    <mesh position={[0, height + .18, 0]}><boxGeometry args={[1.85, .3, 1.85]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 1.35 : .12} /></mesh>
    <mesh position={[0,height+.42,0]}><sphereGeometry args={[.16,10,8]}/><meshBasicMaterial color={accent}/></mesh>
  </group>
}

function DataCity({ active }) {
  const towers = [
    [-3.7, 0, -2.4, 3.8, '#ff78b6'], [-1.15, 0, -3, 5.5, '#5dd9ff'], [1.5, 0, -2.45, 4.4, '#9f8cff'],
    [3.7, 0, -1.2, 6.2, '#66f0c0'], [-3, 0, 1.2, 5.1, '#67c9ff'], [0, 0, 1.3, 7.1, '#ff85c2'], [3, 0, 2.25, 4.6, '#a78cff'],
  ]
  return <group position={[13, 0, 21]}>
    <mesh position={[0, .25, 0]} receiveShadow><cylinderGeometry args={[7, 7.7, .5, 20]} /><meshStandardMaterial color="#d9e6e8" /></mesh>
    {towers.map(([x, y, z, h, c], i) => <DataTower key={i} position={[x, y + .5, z]} height={h} accent={c} active={active} index={i} />)}
    <mesh position={[0, .62, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[5.4, 5.85, 30]} /><meshStandardMaterial color="#ff7db8" emissive="#ff4c9c" emissiveIntensity={active ? .65 : .06} /></mesh>
    <ZoneLabel text="Ciudad de datos" position={[0, 9.2, 0]} accent="#ff6fae" scale={5.4} />
  </group>
}

function LogicTower({ active }) {
  const rings = useRef([])
  useFrame(({ clock }) => {
    rings.current.forEach((r, i) => { if (r) { r.rotation.y = clock.elapsedTime * (.28 + i * .13); r.rotation.x = i % 2 ? Math.PI / 2.3 : .3 } })
  })
  return <group position={[-13, 0, 22]}>
    <mesh position={[0, 4.2, 0]} castShadow receiveShadow><cylinderGeometry args={[1.8, 3.2, 8.4, 10]} /><meshStandardMaterial color="#edf3f8" metalness={.32} roughness={.3} /></mesh>
    {[1.6, 3.1, 4.6, 6.1].map((y, i) => <mesh key={y} position={[0, y, 0]}><torusGeometry args={[2.05 - i * .14, .09, 8, 30]} /><meshStandardMaterial color="#8aa6ff" emissive="#567aff" emissiveIntensity={active ? .8 : .08} /></mesh>)}
    <group position={[0, 8.6, 0]}>
      {[0, 1, 2].map((i) => <mesh ref={(node) => { rings.current[i] = node }} key={i}><torusGeometry args={[2.6 - i * .45, .11, 10, 42]} /><meshStandardMaterial color={i === 1 ? '#5ee8ff' : '#8398ff'} emissive={i === 1 ? '#30d5ff' : '#5d6fff'} emissiveIntensity={active ? 1.7 : .16} /></mesh>)}
      <mesh><sphereGeometry args={[.65, 16, 12]} /><meshStandardMaterial color="#f8fbff" emissive="#6f8cff" emissiveIntensity={active ? 2 : .2} /></mesh>
    </group>
    <ZoneLabel text="Torre lógica" position={[0, 12, 0]} accent="#7aa8ff" scale={5} />
  </group>
}

function Core({ active, progressRatio }) {
  const orb = useRef()
  const rings = useRef([])
  const pylons = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orb.current) { orb.current.rotation.y = t * .55; orb.current.position.y = 3.45 + Math.sin(t * 1.7) * .16 }
    rings.current.forEach((r, i) => { if (r) r.rotation[i % 2 ? 'x' : 'y'] = t * (.22 + i * .12) })
    pylons.current.forEach((node, i) => { if (node) node.material.emissiveIntensity = .08 + progressRatio * .7 + Math.sin(t * 1.8 + i) * .08 })
  })
  return <group position={[0, 0, 0]} scale={0.82}>
    <mesh position={[0, .26, 0]} receiveShadow><cylinderGeometry args={[4.75, 5.2, .52, 48]} /><meshStandardMaterial color="#edf4ef" metalness={.08} roughness={.74} /></mesh>
    <mesh position={[0, .55, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[3.45, 4.1, 52]} /><meshStandardMaterial color="#53d9ec" emissive="#27cbed" emissiveIntensity={.12 + progressRatio * .9} /></mesh>
    <mesh position={[0, .6, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.85, 48]} /><meshStandardMaterial color="#dfe9e8" roughness={.58} metalness={.12} /></mesh>
    <mesh position={[0,.63,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[4.18,4.28,64]}/><meshBasicMaterial color="#5de5f6" transparent opacity={.7}/></mesh>
    {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <mesh key={i} position={[Math.cos(a)*4.45,.61,Math.sin(a)*4.45]} rotation={[0,-a,0]}><boxGeometry args={[.52,.045,.1]}/><meshBasicMaterial color={i%3===0?'#ffd778':'#8cecff'}/></mesh>})}
    {Array.from({length:6},(_,i)=>{
      const a=(i/6)*Math.PI*2
      return <group key={i} position={[Math.cos(a)*3.05,.68,Math.sin(a)*3.05]} rotation={[0,-a,0]}>
        <mesh castShadow><boxGeometry args={[.28,1.8,.28]} /><meshStandardMaterial color="#d7e7e8" metalness={.28} roughness={.3}/></mesh>
        <mesh ref={(node)=>{pylons.current[i]=node}} position={[0,.88,.16]}><boxGeometry args={[.1,.72,.03]} /><meshStandardMaterial color="#65e6f7" emissive="#34d9f1" emissiveIntensity={.25}/></mesh>
      </group>
    })}
    <group ref={orb} position={[0, 3.45, 0]}>
      <mesh castShadow><icosahedronGeometry args={[1.15, 2]} /><meshStandardMaterial color={active ? '#ffffff' : '#7fa9b5'} emissive={active ? '#44dcff' : '#174253'} emissiveIntensity={active ? 3.1 : .32 + progressRatio * .36} metalness={.62} roughness={.12} /></mesh>
      {[0, 1, 2].map((i) => <mesh ref={(node) => { rings.current[i] = node }} key={i} rotation={[i * .6, i * .55, 0]}><torusGeometry args={[1.85 + i * .32, .065, 8, 44]} /><meshStandardMaterial color={i === 1 ? '#ffd66e' : '#59e3ff'} emissive={i === 1 ? '#ffbf36' : '#35d2ff'} emissiveIntensity={active ? 2.2 : .4 + progressRatio * .65} /></mesh>)}
    </group>
    <ZoneLabel text="Núcleo central" position={[0, 6.85, 0]} accent="#6eeeff" scale={4.7} />
  </group>
}
function Path({ from, to, width = 2.15, color = '#dce8e6', glow = false }) {
  const dx = to[0] - from[0], dz = to[1] - from[1]
  const length = Math.hypot(dx, dz)
  const angle = Math.atan2(dz, dx)
  const center = [(from[0] + to[0]) / 2, .1, (from[1] + to[1]) / 2]
  return <group position={center} rotation={[0, -angle, 0]}>
    <mesh receiveShadow><boxGeometry args={[length, .18, width]} /><meshStandardMaterial color={color} roughness={.82} /></mesh>
    {glow && <mesh position={[0, .105, 0]}><boxGeometry args={[length * .94, .035, .08]} /><meshStandardMaterial color="#5de8ff" emissive="#36d5ff" emissiveIntensity={.85} /></mesh>}
  </group>
}

function Lamp({ position, active }) {
  return <group position={position}>
    <mesh position={[0, 1.15, 0]}><cylinderGeometry args={[.06, .09, 2.3, 8]} /><meshStandardMaterial color="#435b68" metalness={.55} /></mesh>
    <mesh position={[0, 2.33, 0]}><sphereGeometry args={[.16, 10, 8]} /><meshStandardMaterial color={active ? '#dffaff' : '#7894a1'} emissive="#59e5ff" emissiveIntensity={active ? 1.8 : .08} /></mesh>
  </group>
}

function Bench({ position, rotation = 0 }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, .42, 0]} castShadow><boxGeometry args={[1.8, .14, .5]} /><meshStandardMaterial color="#b67f54" roughness={.7} /></mesh>
    <mesh position={[0, .85, -.2]} rotation={[-.12, 0, 0]}><boxGeometry args={[1.8, .75, .12]} /><meshStandardMaterial color="#b67f54" /></mesh>
    {[-.65, .65].map((x) => <mesh key={x} position={[x, .2, 0]}><boxGeometry args={[.12, .45, .38]} /><meshStandardMaterial color="#394c57" metalness={.5} /></mesh>)}
  </group>
}

function WaterFeature({ lowPower }) {
  const water = useRef()
  const ripples = useRef([])
  const jet = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (water.current) water.current.material.opacity = .58 + Math.sin(t * 1.3) * .045
    ripples.current.forEach((ring, i) => {
      if (!ring) return
      const phase = (t * .2 + i / 3) % 1
      const scale = .45 + phase * 3.2
      ring.scale.setScalar(scale)
      ring.material.opacity = (1 - phase) * .42
    })
    if (jet.current) jet.current.scale.y = .72 + Math.sin(t * 2.2) * .12
  })
  return <group position={[-23, 0, 7]}>
    <mesh position={[0, .18, 0]} receiveShadow><cylinderGeometry args={[6.5, 6.8, .36, 30]} /><meshStandardMaterial color="#c6d9d4" roughness={.64} /></mesh>
    <mesh ref={water} position={[0, .39, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[5.8, 40]} /><meshStandardMaterial color="#48b7cf" transparent opacity={.62} roughness={.1} metalness={.18} /></mesh>
    <mesh position={[0,.43,0]}><cylinderGeometry args={[.62,.82,.55,12]}/><meshStandardMaterial color="#e7f0eb" metalness={.24}/></mesh>
    <mesh ref={jet} position={[0,1.05,0]}><cylinderGeometry args={[.055,.12,1.25,8]}/><meshBasicMaterial color="#8ef4ff" transparent opacity={.62}/></mesh>
    <mesh position={[0,1.72,0]}><sphereGeometry args={[.18,10,8]}/><meshBasicMaterial color="#e8ffff"/></mesh>
    {[0,1,2].map((i)=><mesh key={i} ref={n=>ripples.current[i]=n} position={[0,.47+i*.006,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.78+i*.16,.035,6,32]}/><meshBasicMaterial color="#b9f5ff" transparent opacity={.35} depthWrite={false}/></mesh>)}
    {!lowPower && Array.from({ length: 6 }, (_, i) => <mesh key={`stone-${i}`} position={[Math.cos(i) * 3.8, .58, Math.sin(i * 1.3) * 3.5]}><sphereGeometry args={[.18, 8, 6]} /><meshStandardMaterial color="#e7f5f4" emissive="#6beaff" emissiveIntensity={.25} /></mesh>)}
  </group>
}

function AmbientBot({ position, index = 0, accent = '#5fe8ff' }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(t * 1.6 + index) * .25
    ref.current.rotation.y = t * .55 + index
  })
  return <group ref={ref} position={position}>
    <mesh castShadow><sphereGeometry args={[.32, 12, 10]} /><meshStandardMaterial color="#eef8fb" metalness={.35} /></mesh>
    <mesh position={[0, 0, .3]}><boxGeometry args={[.32, .12, .04]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} /></mesh>
    <mesh position={[0, -.48, 0]}><coneGeometry args={[.18, .42, 8]} /><meshStandardMaterial color={accent} transparent opacity={.42} emissive={accent} emissiveIntensity={.6} /></mesh>
  </group>
}

function Cloud({ position, scale = 1 }) {
  return <group position={position} scale={scale}>
    {[[-1, 0, 0], [0, .18, 0], [1, 0, .05], [.35, -.08, .4]].map((p, i) => <mesh key={i} position={p}><sphereGeometry args={[1.15 - i * .08, 10, 8]} /><meshBasicMaterial color="#f5fbff" transparent opacity={.74} /></mesh>)}
  </group>
}

function ActivationBurst({ event }) {
  const group = useRef()
  const target = EVENT_TARGETS[event?.type]
  const geometry = useMemo(() => {
    const count = 72
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const r = .7 + (i % 9) * .18
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = ((i % 13) / 13 - .35) * 4
      positions[i * 3 + 2] = Math.sin(a) * r
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])
  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = clock.elapsedTime * 1.4
    const pulse = 1 + Math.sin(clock.elapsedTime * 5) * .08
    group.current.scale.setScalar(pulse)
  })
  if (!target || !event) return null
  return <group ref={group} position={target}>
    <points geometry={geometry}><pointsMaterial color="#75efff" size={.13} transparent opacity={.9} depthWrite={false} /></points>
    <mesh><sphereGeometry args={[.42, 12, 10]} /><meshBasicMaterial color="#ffffff" transparent opacity={.6} /></mesh>
  </group>
}


function GradientSky({ final = false }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(final ? '#58c4df' : '#56b5d2') },
      bottomColor: { value: new THREE.Color(final ? '#e9f7dc' : '#cce9df') },
      offset: { value: 24.0 },
      exponent: { value: 0.7 },
    },
    vertexShader: 'varying vec3 vWorldPosition; void main(){ vec4 worldPosition = modelMatrix * vec4(position,1.0); vWorldPosition = worldPosition.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 topColor; uniform vec3 bottomColor; uniform float offset; uniform float exponent; varying vec3 vWorldPosition; void main(){ float h = normalize(vWorldPosition + vec3(0.0,offset,0.0)).y; float f = max(pow(max(h,0.0),exponent),0.0); gl_FragColor = vec4(mix(bottomColor,topColor,f),1.0); }'
  }), [final])
  useEffect(() => () => material.dispose(), [material])
  return <mesh scale={110}><sphereGeometry args={[1, 24, 16]} /><primitive object={material} attach="material" /></mesh>
}

function IslandTerrain({ final = false }) {
  return <group>
    <mesh position={[0,-2.15,0]} receiveShadow><cylinderGeometry args={[72,78,1.05,72]} /><meshStandardMaterial color="#4f93a5" roughness={.28} metalness={.12} /></mesh>
    <mesh position={[0,-1.02,0]} receiveShadow><cylinderGeometry args={[45,48,2.1,64]} /><meshStandardMaterial color={final ? '#426e5d' : '#3f6a5c'} roughness={1} /></mesh>
    <mesh position={[0,-.05,0]} rotation={[-Math.PI/2,0,0]} receiveShadow><circleGeometry args={[45,72]} /><meshStandardMaterial color={final ? '#82c495' : '#6eaa89'} roughness={.98} /></mesh>
    <mesh position={[0,.045,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[36.5,44,64]} /><meshStandardMaterial color="#a4c8a9" transparent opacity={.48} roughness={1}/></mesh>
    <mesh position={[0,-.42,0]}><cylinderGeometry args={[45.2,47.5,.42,64,1,true]}/><meshStandardMaterial color="#6f927b" roughness={.95} side={THREE.DoubleSide}/></mesh>
    {[[34,-23,6],[31,28,5.2],[-33,22,5.5],[-35,-17,4.4],[-7,-35,4],[17,34,4.6]].map(([x,z,r],i)=><mesh key={i} position={[x,.08,z]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[r,24]}/><meshStandardMaterial color={i%2?'#689b7e':'#72a487'} roughness={1}/></mesh>)}
    {Array.from({length:18},(_,i)=>{const a=i*Math.PI*2/18;const r=41.8;return <mesh key={`edge-${i}`} position={[Math.cos(a)*r,.2,Math.sin(a)*r]} rotation={[0,-a,0]} scale={[1,.55,1]}><dodecahedronGeometry args={[1.05,0]}/><meshStandardMaterial color={i%2?'#6d927b':'#86a88c'} roughness={1}/></mesh>})}
  </group>
}

function CurvedPath({ points, width = 1.65, glow = false, color = '#e5ece8' }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(([x,z]) => new THREE.Vector3(x,.15,z))), [points])
  const borderGeometry = useMemo(() => new THREE.TubeGeometry(curve, 40, width * .62, 8, false), [curve,width])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 40, width * .5, 8, false), [curve,width])
  useEffect(() => () => { borderGeometry.dispose(); geometry.dispose() }, [borderGeometry,geometry])
  const glowGeometry = useMemo(() => {
    if (!glow) return null
    const glowCurve = new THREE.CatmullRomCurve3(points.map(([x,z]) => new THREE.Vector3(x,.68,z)))
    return new THREE.TubeGeometry(glowCurve, 40, .055, 6, false)
  }, [points, glow])
  useEffect(() => () => glowGeometry?.dispose(), [glowGeometry])
  return <>
    <mesh geometry={borderGeometry} receiveShadow><meshStandardMaterial color="#a9c1b9" roughness={.95} /></mesh>
    <mesh geometry={geometry} receiveShadow><meshStandardMaterial color={color} roughness={.82} metalness={.04} /></mesh>
    {glowGeometry && <mesh geometry={glowGeometry}><meshBasicMaterial color="#6eeaff" transparent opacity={.74}/></mesh>}
  </>
}

function CampusTree({ position, scale=1, tint='#4f8c68', bloom=false, index=0 }) {
  const crown=useRef()
  useFrame(({clock})=>{ if(crown.current) crown.current.rotation.z=Math.sin(clock.elapsedTime*.7+index)*.018 })
  return <group position={position} scale={scale}>
    <mesh position={[0,.12,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.58,.82,18]}/><meshStandardMaterial color="#c8d8c4" roughness={.9}/></mesh>
    <mesh position={[0,.85,0]} castShadow><cylinderGeometry args={[.13,.23,1.7,7]}/><meshStandardMaterial color="#715a42" roughness={.9}/></mesh>
    <mesh position={[-.25,1.1,0]} rotation={[0,0,-.55]}><cylinderGeometry args={[.07,.1,.9,6]}/><meshStandardMaterial color="#80664a"/></mesh>
    <mesh position={[.26,1.22,0]} rotation={[0,0,.52]}><cylinderGeometry args={[.07,.1,.85,6]}/><meshStandardMaterial color="#80664a"/></mesh>
    <group ref={crown} position={[0,2.05,0]}>
      <mesh castShadow><icosahedronGeometry args={[.92,1]}/><meshStandardMaterial color={tint} roughness={.78} emissive={bloom?'#27d48b':'#000'} emissiveIntensity={bloom?.16:0}/></mesh>
      <mesh position={[.48,-.12,.18]} castShadow><icosahedronGeometry args={[.58,1]}/><meshStandardMaterial color={bloom?'#79e8a7':'#5b9572'} roughness={.82}/></mesh>
      <mesh position={[-.38,.26,-.12]} castShadow><icosahedronGeometry args={[.48,1]}/><meshStandardMaterial color={bloom?'#8cf0b3':'#477d62'} roughness={.84}/></mesh>
      {bloom && <>{[[-.35,.25,.35],[.3,.4,-.2],[.42,-.02,.42],[-.1,.55,.1]].map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[.11,7,6]}/><meshBasicMaterial color={i%2?'#fff0a8':'#ffd1e5'}/></mesh>)}</>}
    </group>
  </group>
}

function Rock({ position, scale=1 }) {
  return <mesh position={position} scale={scale} castShadow><dodecahedronGeometry args={[.55,0]}/><meshStandardMaterial color="#8c9d96" roughness={.95}/></mesh>
}

function FlowerBed({ position, accent='#ff8fc7', lowPower=false }) {
  return <group position={position}>
    <mesh position={[0,.08,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.42,22]}/><meshStandardMaterial color="#a5bda0" roughness={1}/></mesh>
    <mesh position={[0,.1,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.24,22]}/><meshStandardMaterial color="#477a5a" roughness={1}/></mesh>
    <mesh position={[0,.12,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[1.18,1.3,24]}/><meshStandardMaterial color="#d5e5d2"/></mesh>
    {Array.from({length:lowPower?4:9},(_,i)=>{
      const a=i*2.399, r=.28+(i%3)*.28
      return <group key={i} position={[Math.cos(a)*r,.18,Math.sin(a)*r]}>
        <mesh position={[0,.18,0]}><cylinderGeometry args={[.025,.035,.36,5]}/><meshStandardMaterial color="#3e7c55"/></mesh>
        <mesh position={[0,.4,0]}><sphereGeometry args={[.09,6,5]}/><meshBasicMaterial color={i%3===0?'#ffe480':i%2?accent:'#ffffff'}/></mesh>
      </group>
    })}
  </group>
}

function CampusArch({ position, rotation=0, accent='#5de3f4', label='AEROLAB' }) {
  const texture=useLabelTexture(label,accent)
  return <group position={position} rotation={[0,rotation,0]}>
    <mesh position={[0,.12,0]}><boxGeometry args={[4.25,.24,1.15]}/><meshStandardMaterial color="#c4d7d8" roughness={.6}/></mesh>
    {[-1.6,1.6].map(x=><group key={x} position={[x,0,0]}><mesh position={[0,1.45,0]} castShadow><boxGeometry args={[.34,2.9,.55]}/><meshStandardMaterial color="#e8f1ef" metalness={.3} roughness={.28}/></mesh><mesh position={[0,1.42,.3]}><boxGeometry args={[.08,2.45,.035]}/><meshBasicMaterial color={accent}/></mesh><mesh position={[0,.18,0]}><boxGeometry args={[.72,.3,.78]}/><meshStandardMaterial color="#92aeb5" metalness={.3}/></mesh></group>)}
    <mesh position={[0,2.82,0]} castShadow><boxGeometry args={[3.55,.32,.62]}/><meshStandardMaterial color="#183d4d" emissive={accent} emissiveIntensity={.24}/></mesh>
    <mesh position={[0,2.62,.34]}><boxGeometry args={[3.25,.06,.05]}/><meshBasicMaterial color={accent}/></mesh>
    {texture && <sprite position={[0,3.35,0]} scale={[3.1,.73,1]}><spriteMaterial map={texture} transparent depthWrite={false}/></sprite>}
  </group>
}

function EnergyBeam({ from, to=[0,3,0], color='#5ee8ff', active=false }) {
  const data=useMemo(()=>{
    const a=new THREE.Vector3(...from), b=new THREE.Vector3(...to)
    const dir=b.clone().sub(a), len=dir.length(), mid=a.clone().add(b).multiplyScalar(.5)
    const quaternion=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize())
    return { len, mid, quaternion }
  },[from,to])
  if(!active) return null
  return <mesh position={data.mid} quaternion={data.quaternion}><cylinderGeometry args={[.035,.035,data.len,6]}/><meshBasicMaterial color={color} transparent opacity={.42}/></mesh>
}

function FloatingTraffic({ lowPower=false, active=false }) {
  const refs=useRef([])
  const count=lowPower?2:5
  useFrame(({clock})=>{
    const t=clock.elapsedTime
    refs.current.forEach((r,i)=>{
      if(!r) return
      const radius=18+i*2.3
      const speed=.07+i*.012
      r.position.set(Math.cos(t*speed+i*1.7)*radius, 7.5+(i%3)*1.4+Math.sin(t*.55+i)*.35, Math.sin(t*speed+i*1.7)*radius)
      r.rotation.y=-t*speed-i*1.7+Math.PI/2
    })
  })
  return <>{Array.from({length:count},(_,i)=><group ref={n=>{refs.current[i]=n}} key={i}>
    <mesh castShadow><boxGeometry args={[.75,.18,.42]}/><meshStandardMaterial color="#f3f7f8" metalness={.5} roughness={.2}/></mesh>
    <mesh position={[0,0,.25]}><boxGeometry args={[.28,.08,.03]}/><meshBasicMaterial color={i%2?'#ff91c5':'#62e9ff'}/></mesh>
    <mesh position={[0,-.22,0]}><coneGeometry args={[.12,.38,8]}/><meshBasicMaterial color={active?'#6effc4':'#71dff4'} transparent opacity={.42}/></mesh>
  </group>)}</>
}

function ZoneBeacon({ position, color, active=false }) {
  const ring=useRef()
  useFrame(({clock})=>{if(ring.current) ring.current.rotation.z=clock.elapsedTime*.22})
  return <group position={position}>
    <mesh position={[0,5.5,0]}><cylinderGeometry args={[.018,.06,9,6]}/><meshBasicMaterial color={color} transparent opacity={active?.4:.18}/></mesh>
    <mesh ref={ring} position={[0,9.6,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.72,.035,7,28]}/><meshBasicMaterial color={color} transparent opacity={active?.9:.34}/></mesh>
  </group>
}
function CampusPlaza({ active = false, lowPower = false }) {
  const rings = useRef([])
  useFrame(({clock}) => rings.current.forEach((ring,i)=>{ if(ring) ring.rotation.z = clock.elapsedTime * (i%2 ? -.08 : .08) }))
  return <group position={[0,0,0]}>
    <mesh position={[0,.025,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[9.1,64]}/><meshStandardMaterial color="#a8c5c5" roughness={.88}/></mesh>
    <mesh position={[0,.055,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[8.55,64]}/><meshStandardMaterial color="#dce8e5" roughness={.72}/></mesh>
    <mesh position={[0,.075,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[7.25,7.55,64]}/><meshStandardMaterial color="#8daeb0" metalness={.16}/></mesh>
    <mesh position={[0,.085,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[8.25,8.38,64]}/><meshBasicMaterial color={active?'#72f0d2':'#69dced'} transparent opacity={active?.85:.45}/></mesh>
    {[0,1,2,3].map(i=><group key={i} rotation={[0,i*Math.PI/2,0]}>
      <mesh position={[0,.1,7.9]}><boxGeometry args={[.16,.05,.62]}/><meshBasicMaterial color="#f5cf78"/></mesh>
      <mesh position={[0,.42,8.9]}><cylinderGeometry args={[.16,.22,.72,8]}/><meshStandardMaterial color="#a5c4c6"/></mesh>
      <mesh position={[0,.82,8.9]}><sphereGeometry args={[.12,8,6]}/><meshStandardMaterial color="#6ce8f4" emissive="#5bdcf1" emissiveIntensity={active?1.6:.25}/></mesh>
    </group>)}
    {!lowPower && [0,1,2,3].map(i=><mesh key={`r${i}`} ref={n=>rings.current[i]=n} position={[0,.1,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[5.9+i*.36,5.94+i*.36,64]}/><meshBasicMaterial color={i%2?'#eabf70':'#77ddea'} transparent opacity={active?.65:.28}/></mesh>)}
  </group>
}

function Campus({ completed, liveEvent, lowPower, quality='high' }) {
  const has = (id) => completed.includes(id)
  const comm = has('cw-01')
  const generator = has('cw-02')
  const door = has('cw-03')
  const garden = has('cw-04')
  const selective = has('cw-05')
  const hangar = has('cw-06')
  const drones = has('cw-07')
  const data = has('cw-09')
  const logic = has('cw-10')
  const final = has('cw-12')
  const ratio = completed.length / 12
  const pathsGlow = completed.length >= 6
  const decorCount = quality === 'high' ? 24 : quality === 'medium' ? 18 : 12
  const treeSpots = [
    [-28,-28,1.15],[-24,-27,.9],[-31,-20,1.1],[-33,-8,1.2],[-29,0,.92],[-32,12,1.1],[-27,27,1.05],[-20,31,.85],[-7,32,1.05],
    [7,33,.9],[22,31,1.15],[30,25,1.05],[32,15,.95],[33,1,1.15],[31,-10,.88],[30,-25,1.12],[20,-31,.95],[7,-33,1.08],[-8,-33,.95],[-22,-31,1.1],
    [-14,-7,.78],[14,-7,.82],[-8,13,.78],[8,13,.8]
  ]
  return <>
    <IslandTerrain final={final} />
    <CurvedPath points={[[0,-4],[0,-10],[-2,-15],[0,-18]]} width={1.7} glow={pathsGlow}/>
    <CurvedPath points={[[4,-3],[9,-6],[14,-10],[18,-12]]} width={1.55} glow={pathsGlow}/>
    <CurvedPath points={[[4,2],[10,3],[16,5],[20,6]]} width={1.6} glow={pathsGlow}/>
    <CurvedPath points={[[3,4],[6,10],[9,15],[11,18]]} width={1.55} glow={pathsGlow}/>
    <CurvedPath points={[[-3,4],[-6,10],[-9,15],[-11,18]]} width={1.55} glow={pathsGlow}/>
    <CurvedPath points={[[-4,-3],[-9,-6],[-14,-11],[-18,-14]]} width={1.55} glow={pathsGlow}/>
    <CurvedPath points={[[-5,1],[-11,2],[-17,5],[-22,7]]} width={1.35} color="#d7e4df"/>
    <CurvedPath points={[[12,-8],[17,-4],[20,0],[22,3]]} width={1.25} color="#d7e4df"/>

    <CampusPlaza active={final || ratio > .5} lowPower={lowPower}/>
    <Core active={final} progressRatio={ratio} />
    <CommunicationCenter active={comm} />
    <EnergyLab active={generator} doorOpen={door} />
    <DigitalGarden active={garden} selective={selective} lowPower={lowPower} />
    <DroneHangar powered={hangar} active={drones} lowPower={lowPower} />
    <DataCity active={data} />
    <LogicTower active={logic} />
    <WaterFeature lowPower={lowPower} />

    <CampusArch position={[0,0,11]} rotation={Math.PI} label="CODEWORLD" />
    <CampusArch position={[0,0,-11]} label="AEROLAB" accent="#ffd16b" />

    {treeSpots.slice(0,decorCount).map(([x,z,scale],i)=><CampusTree key={i} index={i} position={[x,0,z]} scale={scale} tint={i%3===0?'#477f62':'#4f8c68'} bloom={final || garden}/>) }
    <FlowerBed position={[-8,0,-6]} accent="#ff91c5" lowPower={lowPower}/>
    <FlowerBed position={[8,0,-6]} accent="#80d9ff" lowPower={lowPower}/>
    {!lowPower && <>
      <FlowerBed position={[-7,0,9]} accent="#c69bff" />
      <FlowerBed position={[7,0,9]} accent="#ffe083" />
      {[[-35,0,-2],[35,0,8],[-27,0,14],[25,0,-23],[-31,0,26],[30,0,-27]].map((p,i)=><Rock key={i} position={p} scale={1+i*.12}/>)}
    </>}

    {[
      [-7,-9],[7,-9],[-11,-2],[11,-2],[-8,11],[8,11],[-18,-8],[18,-5],[-5,17],[5,17],[-25,-3],[27,-2],[-22,15],[21,15],[-27,-19],[26,22]
    ].slice(0,quality==='high'?16:quality==='medium'?12:8).map(([x,z],i)=><Lamp key={i} position={[x,0,z]} active={ratio>.08}/>) }

    <Bench position={[-7,0,5]} rotation={.35}/><Bench position={[7,0,5]} rotation={-.35}/>
    {!lowPower && <><Bench position={[-3,0,-8]} rotation={Math.PI}/><Bench position={[3,0,8]}/></>}
    <AmbientBot position={[-5,2.4,1]}/>
    {!lowPower && <><AmbientBot position={[7,2.8,-4]} index={1} accent="#ff9bc8"/><AmbientBot position={[15,2.2,12]} index={2} accent="#a98cff"/></>}

    <ZoneBeacon position={[-20,0,-17]} color="#47d7ff" active={comm}/>
    <ZoneBeacon position={[0,0,-22]} color="#ffbd4a" active={generator}/>
    <ZoneBeacon position={[21,0,-14]} color="#62e6a6" active={garden}/>
    <ZoneBeacon position={[24,0,6]} color="#b58cff" active={hangar}/>
    <ZoneBeacon position={[13,0,21]} color="#ff6fae" active={data}/>
    <ZoneBeacon position={[-13,0,22]} color="#7aa8ff" active={logic}/>

    <EnergyBeam from={[-20,5,-17]} color="#47d7ff" active={comm}/>
    <EnergyBeam from={[0,5,-22]} color="#ffbd4a" active={generator}/>
    <EnergyBeam from={[21,4,-14]} color="#62e6a6" active={selective}/>
    <EnergyBeam from={[24,5,6]} color="#b58cff" active={drones}/>
    <EnergyBeam from={[13,7,21]} color="#ff6fae" active={data}/>
    <EnergyBeam from={[-13,9,22]} color="#7aa8ff" active={logic}/>

    <FloatingTraffic lowPower={lowPower} active={ratio>.25}/>
    <ActivationBurst event={liveEvent}/>
  </>
}
function Terminal({ mission, unlocked, completed, current, onOpen }) {
  const ref = useRef()
  const halo = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = .72 + Math.sin(clock.elapsedTime * 2 + mission.order) * .07
    if (halo.current) halo.current.rotation.z = clock.elapsedTime * .65
  })
  const color = completed ? '#4ce8a4' : unlocked ? '#48d8ff' : '#66727a'
  return <group position={mission.terminal} ref={ref} onClick={(e) => { e.stopPropagation(); if (unlocked) onOpen(mission.id) }}>
    <mesh castShadow><cylinderGeometry args={[.48, .68, 1.3, 12]} /><meshStandardMaterial color="#dcebed" metalness={.48} roughness={.24} /></mesh>
    <mesh position={[0,-.58,0]}><cylinderGeometry args={[.66,.78,.18,12]}/><meshStandardMaterial color="#8caeb5" metalness={.4}/></mesh>
    <mesh position={[0, .36, .34]} rotation={[-.15, 0, 0]}><boxGeometry args={[.82, .56, .1]} /><meshStandardMaterial color="#102d43" metalness={.32} /></mesh>
    <mesh position={[0, .36, .405]} rotation={[-.15, 0, 0]}><boxGeometry args={[.68, .39, .025]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={unlocked ? 1.9 : .08} /></mesh>
    <mesh position={[0, -.64, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.55, .76, 24]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={unlocked ? .7 : .04} /></mesh>
    <mesh position={[0,1.08,0]}><sphereGeometry args={[.13,10,8]}/><meshBasicMaterial color={color}/></mesh>
    {current && <group ref={halo} position={[0, 1.45, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.78, .055, 8, 30]} /><meshStandardMaterial color="#ffd76a" emissive="#ffd76a" emissiveIntensity={2.4} /></mesh>
      <mesh position={[0, .75, 0]}><coneGeometry args={[.18, .48, 6]} /><meshStandardMaterial color="#ffd76a" emissive="#ffd76a" emissiveIntensity={1.6} /></mesh>
    </group>}
  </group>
}

function ChibiPlayer({ completed, mobile, onNearMission, onPlayerPosition, liveEvent }) {
  const root = useRef()
  const body = useRef()
  const hair = useRef()
  const leftArm = useRef(), rightArm = useRef(), leftLeg = useRef(), rightLeg = useRef()
  const keys = useRef({})
  const nearRef = useRef(null)
  const callbackClock = useRef(0)
  useEffect(() => {
    const down = (e) => { keys.current[e.key.toLowerCase()] = true }
    const up = (e) => { keys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])
  useFrame((state, delta) => {
    const g = root.current
    if (!g) return
    const key = keys.current
    const dx = liveEvent ? 0 : (key.d || key.arrowright || mobile.right ? 1 : 0) - (key.a || key.arrowleft || mobile.left ? 1 : 0)
    const dz = liveEvent ? 0 : (key.s || key.arrowdown || mobile.down ? 1 : 0) - (key.w || key.arrowup || mobile.up ? 1 : 0)
    const moving = Boolean(dx || dz)
    const running = moving && key.shift
    if (moving) {
      const len = Math.hypot(dx, dz) || 1
      const speed = (running ? 8.3 : 5.9) * delta
      const nx = THREE.MathUtils.clamp(g.position.x + dx / len * speed, -39, 39)
      const nz = THREE.MathUtils.clamp(g.position.z + dz / len * speed, -39, 39)
      if (!blockedAt(nx, g.position.z)) g.position.x = nx
      if (!blockedAt(g.position.x, nz)) g.position.z = nz
      const desired = Math.atan2(dx, dz)
      let diff = desired - g.rotation.y
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      g.rotation.y += diff * Math.min(1, delta * 12)
    }
    const t = state.clock.elapsedTime
    const stride = moving ? Math.sin(t * (running ? 13 : 9.5)) * (running ? .72 : .5) : 0
    if (leftArm.current) leftArm.current.rotation.x = stride
    if (rightArm.current) rightArm.current.rotation.x = -stride
    if (leftLeg.current) leftLeg.current.rotation.x = -stride * .72
    if (rightLeg.current) rightLeg.current.rotation.x = stride * .72
    if (body.current) body.current.position.y = moving ? Math.abs(Math.sin(t * 9.5)) * .05 : Math.sin(t * 1.7) * .028
    if (hair.current) hair.current.rotation.z = moving ? Math.sin(t*9.5)*.035 : Math.sin(t*.9)*.015

    if (liveEvent && EVENT_TARGETS[liveEvent.type]) {
      const target = EVENT_TARGETS[liveEvent.type]
      const compact = state.size.width < 760
      v3.set(target[0] + (compact ? 5.8 : 7.5), target[1] + (compact ? 4.4 : 5.2), target[2] + (compact ? 6.5 : 8.5))
      cameraTarget.set(target[0], Math.max(1.3, target[1]), target[2])
      state.camera.position.lerp(v3, 1 - Math.pow(.0008, delta))
      state.camera.lookAt(cameraTarget)
    } else {
      const compact = state.size.width < 760
      const tablet = state.size.width < 1280 || state.size.height < 680
      const cameraDistance = compact ? 6.5 : tablet ? 8.8 : 10.4
      const cameraHeight = compact ? 5.0 : tablet ? 6.25 : 7.25
      const lateral = compact ? 1.35 : tablet ? 3.1 : 3.7
      const behindX = Math.sin(g.rotation.y) * -cameraDistance
      const behindZ = Math.cos(g.rotation.y) * -cameraDistance
      v3.set(g.position.x + behindX + lateral, cameraHeight, g.position.z + behindZ + (compact ? .45 : 1.05))
      state.camera.position.lerp(v3, 1 - Math.pow(.0014, delta))
      cameraTarget.set(g.position.x, 1.35, g.position.z)
      state.camera.lookAt(cameraTarget)
    }

    let nearest = null, dist = 999
    for (const m of codeWorldMissions) {
      if (!isCodeWorldUnlocked(m.id, completed)) continue
      const d = Math.hypot(g.position.x - m.terminal[0], g.position.z - m.terminal[2])
      if (d < dist) { dist = d; nearest = m }
    }
    const next = dist < 4.25 ? nearest?.id : null
    if (next !== nearRef.current) { nearRef.current = next; onNearMission(next) }
    callbackClock.current += delta
    if (callbackClock.current > .25) {
      callbackClock.current = 0
      onPlayerPosition?.({ x: g.position.x, z: g.position.z, nearestMissionId: nearest?.id ?? null, distance: dist })
    }
  })
  return <group ref={root} position={[0, 0, 9]}>
    <mesh position={[0,.025,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.72,28]}/><meshBasicMaterial color="#12333d" transparent opacity={.25} depthWrite={false}/></mesh>
    <group ref={body} scale={1.06}>
      <mesh position={[0,.92,0]} castShadow><capsuleGeometry args={[.39,.78,6,10]}/><meshStandardMaterial color="#f7fbfb" roughness={.48}/></mesh>
      <mesh position={[0,1.13,-.39]} castShadow><capsuleGeometry args={[.35,.48,5,9]}/><meshStandardMaterial color="#133b56" roughness={.3} metalness={.12}/></mesh>
      <mesh position={[0,1.28,.4]}><boxGeometry args={[.46,.2,.04]}/><meshStandardMaterial color="#2ad4eb" emissive="#22cfe7" emissiveIntensity={.65}/></mesh>
      <mesh position={[0,1.18,-.66]} castShadow><boxGeometry args={[.48,.56,.24]}/><meshStandardMaterial color="#244c68" roughness={.42}/></mesh>
      <mesh position={[0,1.22,-.79]}><boxGeometry args={[.22,.22,.025]}/><meshStandardMaterial color="#56e4f5" emissive="#32d9ed" emissiveIntensity={1.1}/></mesh>
      <mesh position={[-.26,1.47,.03]}><boxGeometry args={[.12,.13,.28]}/><meshStandardMaterial color="#f1b45b" metalness={.2}/></mesh>
      <mesh position={[.26,1.47,.03]}><boxGeometry args={[.12,.13,.28]}/><meshStandardMaterial color="#f1b45b" metalness={.2}/></mesh>
      <mesh position={[0,1.62,.02]}><torusGeometry args={[.29,.045,7,18]}/><meshStandardMaterial color="#ff9b52" emissive="#ff7f32" emissiveIntensity={.25}/></mesh>
      <mesh position={[0,1.95,0]} castShadow><sphereGeometry args={[.52,20,16]}/><meshStandardMaterial color="#ffd8c3" roughness={.62}/></mesh>
      <group ref={hair} position={[0,2.12,-.04]}>
        <mesh position={[0,0,-.2]} castShadow><sphereGeometry args={[.56,18,14,0,Math.PI*2,0,Math.PI*.68]}/><meshStandardMaterial color="#1e3150" roughness={.48}/></mesh>
        {[[-.37,.18,.08,-.55],[.35,.2,.04,.5],[-.18,.38,.02,-.18],[.13,.4,.04,.18]].map(([x,y,z,r],i)=><mesh key={i} position={[x,y,z]} rotation={[0,0,r]} castShadow><coneGeometry args={[.13,.62-i*.05,7]}/><meshStandardMaterial color="#1e3150"/></mesh>)}
      </group>
      <mesh position={[-.18,2,.46]}><sphereGeometry args={[.052,8,6]}/><meshStandardMaterial color="#10233b"/></mesh>
      <mesh position={[.18,2,.46]}><sphereGeometry args={[.052,8,6]}/><meshStandardMaterial color="#10233b"/></mesh>
      <mesh position={[0,1.83,.5]}><boxGeometry args={[.16,.025,.025]}/><meshStandardMaterial color="#d97872"/></mesh>
      <mesh position={[-.24,1.88,.42]}><sphereGeometry args={[.055,8,6]}/><meshStandardMaterial color="#f3a5a0" transparent opacity={.65}/></mesh>
      <mesh position={[.24,1.88,.42]}><sphereGeometry args={[.055,8,6]}/><meshStandardMaterial color="#f3a5a0" transparent opacity={.65}/></mesh>
      <group ref={leftArm} position={[-.49,1.23,0]}><mesh position={[0,-.35,0]} castShadow><capsuleGeometry args={[.12,.54,4,8]}/><meshStandardMaterial color="#ff8b48"/></mesh><mesh position={[0,-.62,.02]}><sphereGeometry args={[.13,8,6]}/><meshStandardMaterial color="#ffd8c3"/></mesh></group>
      <group ref={rightArm} position={[.49,1.23,0]}><mesh position={[0,-.35,0]} castShadow><capsuleGeometry args={[.12,.54,4,8]}/><meshStandardMaterial color="#ff8b48"/></mesh><mesh position={[0,-.62,.02]}><sphereGeometry args={[.13,8,6]}/><meshStandardMaterial color="#ffd8c3"/></mesh><mesh position={[0,-.44,.13]}><torusGeometry args={[.1,.025,6,14]}/><meshStandardMaterial color="#52e2f5" emissive="#34d7ef" emissiveIntensity={1.1}/></mesh></group>
      <group ref={leftLeg} position={[-.19,.45,0]}><mesh position={[0,-.3,0]} castShadow><capsuleGeometry args={[.13,.42,4,8]}/><meshStandardMaterial color="#243d5a"/></mesh><mesh position={[0,-.63,.1]} castShadow><boxGeometry args={[.34,.18,.54]}/><meshStandardMaterial color="#f5f7f7"/></mesh>
      <mesh position={[0,-.7,.28]}><boxGeometry args={[.3,.06,.12]}/><meshStandardMaterial color="#ff9a4e"/></mesh></group>
      <group ref={rightLeg} position={[.19,.45,0]}><mesh position={[0,-.3,0]} castShadow><capsuleGeometry args={[.13,.42,4,8]}/><meshStandardMaterial color="#243d5a"/></mesh><mesh position={[0,-.63,.1]} castShadow><boxGeometry args={[.34,.18,.54]}/><meshStandardMaterial color="#f5f7f7"/></mesh>
      <mesh position={[0,-.7,.28]}><boxGeometry args={[.3,.06,.12]}/><meshStandardMaterial color="#ff9a4e"/></mesh></group>
    </group>
  </group>
}
function SceneContent({ completed, currentMissionId, onOpenMission, mobileControls, onNearMission, onPlayerPosition, liveEvent, quality='high' }) {
  const lowPower=quality==='low'
  const medium=quality==='medium'
  const final=completed.includes('cw-12')
  return <>
    <GradientSky final={final}/>
    <fog attach="fog" args={[final?'#a5d7c5':'#9fcfca', quality==='low'?28:38, quality==='low'?78:105]} />
    <ambientLight intensity={quality==='low'?.92:.72}/>
    <hemisphereLight args={['#eafcff','#52715f', quality==='low'?1.1:1.32]}/>
    <directionalLight position={[18,30,12]} intensity={quality==='high'?2.55:2.15} castShadow={!lowPower} shadow-mapSize-width={medium?1024:lowPower?512:1536} shadow-mapSize-height={medium?1024:lowPower?512:1536} shadow-camera-left={-43} shadow-camera-right={43} shadow-camera-top={43} shadow-camera-bottom={-43}/>
    <directionalLight position={[-20,12,-22]} intensity={.34} color="#8ddff0"/>
    <pointLight position={[0,7,0]} intensity={final?18:2.4+completed.length*.34} distance={36} color="#58e8ff"/>
    <mesh position={[25,34,-50]}><sphereGeometry args={[3.8,18,14]}/><meshBasicMaterial color="#fff3b7"/></mesh>
    <Cloud position={[-20,22,-42]} scale={quality==='low'?1.35:2.2}/>
    <Cloud position={[22,26,-32]} scale={quality==='low'?1.15:1.7}/>
    {!lowPower && <Cloud position={[6,20,-58]} scale={2.6}/>}
    <Campus completed={completed} liveEvent={liveEvent} lowPower={lowPower} quality={quality}/>
    {codeWorldMissions.map((mission)=><Terminal key={mission.id} mission={mission} completed={completed.includes(mission.id)} unlocked={isCodeWorldUnlocked(mission.id,completed)} current={currentMissionId===mission.id} onOpen={onOpenMission}/>) }
    <ChibiPlayer completed={completed} mobile={mobileControls} onNearMission={onNearMission} onPlayerPosition={onPlayerPosition} liveEvent={liveEvent}/>
  </>
}

export default function CodeWorldScene(props) {
  const quality=props.quality || (props.lowPower?'low':'high')
  const dpr=quality==='low'?1:quality==='medium'?[1,1.25]:[1,1.55]
  return <Canvas
    shadows={quality!=='low'}
    dpr={dpr}
    camera={{position:[8,7,19],fov:quality==='low'?53:quality==='medium'?50:48,near:.1,far:180}}
    gl={{antialias:quality!=='low',powerPreference:quality==='low'?'low-power':'high-performance',alpha:false,stencil:false,depth:true}}
    onCreated={({gl})=>{gl.outputColorSpace=THREE.SRGBColorSpace;gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=quality==='low'?1.0:quality==='medium'?1.04:1.08}}
    performance={{min:.55}}
  >
    <SceneContent {...props} quality={quality}/>
  </Canvas>
}
