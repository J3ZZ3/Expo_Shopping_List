# Listify - Shopping List Manager

## Overview
Listify is a modern, feature-rich shopping list management application built with React Native and Expo. It provides users with an intuitive interface to create, manage, and organize their shopping lists efficiently.

## Features

### Core Functionality
- **List Management**
  - Create and manage multiple shopping lists
  - Add, edit, and delete items
  - Mark items as purchased/unpurchased
  - Categorize items for better organization
  - Add notes to items for additional details

### User Interface
- **Modern Design**
  - Clean, intuitive interface
  - Dark theme 
  - Responsive layout for various screen sizes
  - Smooth animations and transitions

### Organization
- **Categories**
  - Group items by categories
  - Filter items by category
  - Custom category management

### Search & Filter
- **Advanced Search**
  - Real-time search functionality
  - Filter by item status (purchased/unpurchased)
  - Category-based filtering

### Data Management
- **List Operations**
  - Save lists for future use
  - Share lists as PDF
  - Share lists with others
  - Clear entire lists with confirmation

### Additional Features
- **Tutorial System**
  - Interactive onboarding
  - Help documentation
  - Feature discovery

## Technical Architecture

### Frontend Framework
- React Native
- Expo Framework
- React Navigation (Stack Navigation)

### State Management
- Redux Toolkit
- AsyncStorage for persistence

### UI Components
- Custom components
- React Native Vector Icons
- Native modals and animations

## Installation

1. Clone the repository:

```bash
git clone https://github.com/J3ZZ3/Expo_Shopping_List.git
```

2. Install dependencies:
```bash
cd Expo_Shopping_List
npm install
```

3. Start project:
```bash
npx expo start
```

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)


## Building and Deployment

### Development Build
```bash
expo build:android -t apk  
expo build:ios            
```

### Production Build
Configure in `eas.json`:
```json
{
  "build": {
    "production": {
      "autoIncrement": true,
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

## Acknowledgments
- React Native community
- Expo team


