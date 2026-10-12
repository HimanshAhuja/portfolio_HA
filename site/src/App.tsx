import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SettingsProvider } from './fx/settings'
import { Chips } from './screens/Chips'
import { Intel } from './screens/Intel'
import { MapScreen } from './screens/MapScreen'
import { Quests } from './screens/Quests'
import { Status } from './screens/Status'
import { System } from './screens/System'
import { Weapons } from './screens/Weapons'
import { Reticle } from './ui/Reticle'
import { Shell } from './ui/Shell'

export default function App() {
  return (
    <SettingsProvider>
      <Reticle />
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route path="status" element={<Status />} />
            <Route path="quests" element={<Quests />} />
            <Route path="weapons/:id?" element={<Weapons />} />
            <Route path="chips" element={<Chips />} />
            <Route path="map" element={<MapScreen />} />
            <Route path="intel" element={<Intel />} />
            <Route path="system" element={<System />} />
            <Route path="*" element={<Navigate to="/status" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}
