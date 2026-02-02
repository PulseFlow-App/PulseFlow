# 🎨 Quick Icon & Color Reference for Pulse App

## App Blocks (Main Categories)

| Block | Icon | Iconify Name | Color | Hex |
|-------|------|--------------|-------|-----|
| 💗 **Body Signals** | Heart + Pulse | `solar:heart-pulse-linear` | Pink-400 | `#f472b6` |
| 💻 **Work Routine** | Laptop | `solar:laptop-linear` | Indigo-400 | `#818cf8` |
| 🌿 **Nutrition** | Leaf | `solar:leaf-linear` | Green-400 | `#4ade80` |
| 🏃 **Movement** | Running | `solar:running-linear` | Orange-400 | `#fb923c` |
| 🌙 **Recovery** | Moon + Stars | `solar:moon-stars-linear` | Purple-400 | `#c084fc` |

---

## AI Image Generation Prompts

### Body Signals
```
Modern minimalist wellness icon, pink gradient (#f472b6), heart with pulse line, 
dark background (#050505), neon glow effect, line art style, 1:1 ratio
```

### Work Routine
```
Modern minimalist wellness icon, indigo gradient (#818cf8), laptop/productivity, 
dark background (#050505), neon glow effect, line art style, 1:1 ratio
```

### Nutrition
```
Modern minimalist wellness icon, green gradient (#4ade80), leaf/organic health, 
dark background (#050505), neon glow effect, line art style, 1:1 ratio
```

### Movement
```
Modern minimalist wellness icon, orange gradient (#fb923c), running figure/exercise, 
dark background (#050505), neon glow effect, line art style, 1:1 ratio
```

### Recovery
```
Modern minimalist wellness icon, purple gradient (#c084fc), moon with stars/sleep, 
dark background (#050505), neon glow effect, line art style, 1:1 ratio
```

---

## Copy-Paste Code Snippets

### React/Next.js Component
```jsx
const appBlocks = [
  { name: 'Body Signals', icon: 'solar:heart-pulse-linear', color: 'text-pink-400' },
  { name: 'Work Routine', icon: 'solar:laptop-linear', color: 'text-indigo-400' },
  { name: 'Nutrition', icon: 'solar:leaf-linear', color: 'text-green-400' },
  { name: 'Movement', icon: 'solar:running-linear', color: 'text-orange-400' },
  { name: 'Recovery', icon: 'solar:moon-stars-linear', color: 'text-purple-400' },
];
```

### CSS Variables
```css
:root {
  --body-signals: #f472b6;
  --work-routine: #818cf8;
  --nutrition: #4ade80;
  --movement: #fb923c;
  --recovery: #c084fc;
}
```

### Tailwind Classes
```html
<!-- Body Signals -->
<div class="text-pink-400 bg-gradient-to-br from-pink-500 to-rose-500">

<!-- Work Routine -->
<div class="text-indigo-400 bg-gradient-to-br from-indigo-500 to-blue-500">

<!-- Nutrition -->
<div class="text-green-400 bg-gradient-to-br from-green-500 to-emerald-500">

<!-- Movement -->
<div class="text-orange-400 bg-gradient-to-br from-orange-500 to-amber-500">

<!-- Recovery -->
<div class="text-purple-400 bg-gradient-to-br from-purple-500 to-violet-500">
```

---

## Icon Library Setup

### Install Iconify
```bash
npm install @iconify/react
# or
yarn add @iconify/react
```

### Usage
```jsx
import { Icon } from '@iconify/react';

<Icon icon="solar:heart-pulse-linear" className="text-5xl text-pink-400" />
```

---

**Quick Tip**: All icons use the "linear" (outline) style from the Solar icon set for consistency!
