**Step-by-Step Planning**

1. **App Structure**
```plaintext
App/
├── app/
│   ├── index.js (Entry point)
│   ├── _layout.js (Main layout with background)
│   └── ShoppingList.js (Main component)
├── components/
│   └── FAB.js (Floating action buttons)
├── redux/
│   ├── store.js (Redux store)
│   └── useReducer.js (State management)
├── hooks/
│   └── useFetch.tsx (Data fetching)
├── constants/
│   └── Colors.ts (Theme colors)
└── assets/
    └── images/ (App images)
```
2. **Feature Implementation**

// Pseudocode for main features

// 1. Shopping List Management
function ShoppingList() {
  // State management
  - Initialize items state
  - Setup search functionality
  - Handle CRUD operations
  
  // UI Components
  - Render search bar
  - Render item list
  - Render add/edit modal
  - Render FAB buttons
}

// 2. Data Persistence
async function handleStorage() {
  // Save to AsyncStorage
  - Save on every list change
  - Load on app start
  
  // Error handling
  - Handle storage failures
  - Show appropriate alerts
}

// 3. Item Operations
function itemOperations() {
  // Add Item
  - Validate input
  - Generate unique ID
  - Update Redux store
  
  // Edit Item
  - Update existing item
  - Maintain other properties
  
  // Delete Item
  - Remove single item
  - Clear entire list option
  
  // Toggle Purchase Status
  - Switch between states
  - Update UI accordingly
}

// 4. Search Functionality
function searchItems() {
  // Filter items
  - Case insensitive search
  - Real-time filtering
  - Handle empty results
}

3. **State Management Flow**

Action Triggered
    ↓
Redux Action Created
    ↓
Reducer Updates State
    ↓
Component Re-renders
    ↓
AsyncStorage Updated

4. **UI Components Hierarchy**

Layout
    ↓
ShoppingList
    ├── SearchBar
    ├── ItemList
    │   └── ItemCard
    ├── AddEditModal
    └── FAB

5. **Data Structure**

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  purchased: boolean;
  createdAt: string;
}

6. **Error Handling**

try {
  // Operation (CRUD, Storage, etc.)
} catch (error) {
  // Show user-friendly error message
  // Log error for debugging
  // Fallback behavior if applicable
}



