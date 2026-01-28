# Pulse Mobile App Development Prompt

## Project Overview
Build **Pulse** - a data-first wellness platform mobile application that turns everyday inputs (food, movement, and body metrics) into a simple daily guidance signal. The app should be available on both **iOS (App Store)** and **Android (Google Play Store)**.

## Core Concept
Pulse transforms complex health data into one simple score (0-100) called the "Daily Pulse" that connects food intake, movement, and recovery. The philosophy is: "No noise. Just signal."

## Platform Requirements
- **iOS**: Compatible with iOS 14.0+, optimized for iPhone and iPad
- **Android**: Compatible with Android 8.0+ (API level 26+)
- **Cross-platform**: Use React Native, Flutter, or similar framework for code sharing
- **App Store Compliance**: Must meet Apple App Store and Google Play Store guidelines

## Core Features

### 1. Fridge → Meals
- **Camera Integration**: Allow users to snap photos of their fridge contents
- **AI Recipe Suggestions**: Use computer vision/AI to identify ingredients and suggest recipes
- **Goal-Based Filtering**: Recipes should align with user's health/fitness goals
- **Meal Logging**: Track meals consumed throughout the day
- **Nutritional Data**: Display macro and micronutrient information

### 2. Training → Performance
- **Manual Workout Logging**: Users can manually log workouts (type, duration, intensity)
- **Activity Tracker Integration**: 
  - iOS: HealthKit integration (Apple Watch, iPhone sensors)
  - Android: Google Fit integration (Wear OS, fitness apps)
  - Third-party: Strava, MyFitnessPal, etc.
- **Performance Metrics**: Track progress over time (strength, endurance, consistency)
- **Workout Suggestions**: AI-powered workout recommendations based on goals and recovery

### 3. Body → Feedback
- **Weight Tracking**: Daily weight logging with trend visualization
- **Sleep Tracking**: 
  - Manual entry
  - Integration with HealthKit/Google Fit
  - Optional: Sleep cycle analysis
- **Mood/Feeling Log**: Simple daily check-in (energy levels, mood, how you feel)
- **Pattern Recognition**: Visualize correlations between inputs and outcomes
- **No Medical Complexity**: Keep it simple and user-friendly, not clinical

### 4. Daily Pulse (Core Feature)
- **Single Score (0-100)**: Combines all data inputs into one simple number
- **Real-time Updates**: Score updates as new data is logged
- **Visual Dashboard**: 
  - Large, prominent Pulse score display
  - Breakdown by category (food, movement, recovery)
  - Historical trends (daily, weekly, monthly views)
- **Insights**: Simple, actionable insights based on the score
- **Notifications**: Optional daily Pulse score updates

## User Tiers

### Observer (Free Tier)
- Read-only access to public progress updates
- Community access
- Basic tracking features (limited)
- View thesis/documentation

### Participant (Token Access)
- Full AI Coach insights
- Compete in challenges
- Early feature access
- Reputation badge
- Advanced analytics
- Unlimited tracking

## Technical Stack Recommendations

### Cross-Platform Framework Options:
1. **React Native** (Recommended)
   - Large community, extensive libraries
   - Good performance
   - Easy integration with native modules
   - Expo for faster development

2. **Flutter**
   - Excellent performance
   - Beautiful UI out of the box
   - Growing ecosystem

3. **Native Development**
   - Swift/SwiftUI for iOS
   - Kotlin/Jetpack Compose for Android
   - Best performance but more development time

### Key Libraries/Services Needed:
- **Camera/Image Processing**: 
  - React Native: `react-native-vision-camera`, `react-native-image-picker`
  - AI/ML: TensorFlow Lite, Core ML (iOS), ML Kit (Android)
- **Health Data Integration**:
  - iOS: `react-native-health` or native HealthKit
  - Android: Google Fit API
- **Backend/Database**: 
  - Firebase, Supabase, or custom backend
  - User authentication
  - Data storage and sync
- **Blockchain Integration** (for token access):
  - Wallet connection (WalletConnect, MetaMask)
  - Token verification
  - Solana integration (based on pump.fun token)
- **State Management**: Redux, Zustand, or Context API
- **UI Components**: React Native Paper, NativeBase, or custom components

## Design System

### Visual Style:
- **Dark Theme**: Primary background `#050505` (near black)
- **Accent Color**: Indigo (`#6366f1` / `indigo-500`)
- **Glass Morphism**: Frosted glass effects with blur
- **Typography**: Clean, modern sans-serif (Quicksand or similar)
- **Spacing**: Generous padding, rounded corners (32px+)
- **Animations**: Smooth transitions, subtle hover effects

### Key Design Principles:
- Minimalist and clean
- Data visualization should be simple and clear
- Focus on the Daily Pulse score as the hero element
- Dark mode first (light mode optional)
- Accessibility: WCAG AA compliance

## App Structure

### Main Screens:
1. **Onboarding**: Welcome, permissions, goal setting
2. **Dashboard**: Daily Pulse score, quick stats, today's overview
3. **Food**: Fridge camera, meal logging, recipe suggestions
4. **Movement**: Workout logging, activity tracking, performance metrics
5. **Body**: Weight, sleep, mood logging, trends
6. **Insights**: AI coach recommendations, patterns, correlations
7. **Profile**: Settings, token access, subscription management
8. **Challenges** (Participant tier): Community challenges, leaderboards

## Data Privacy & Security
- **HIPAA Considerations**: If storing health data, ensure proper security
- **Data Encryption**: Encrypt sensitive data at rest and in transit
- **User Consent**: Clear permissions for camera, health data, location
- **Privacy Policy**: Comprehensive privacy policy required for app stores
- **Data Export**: Allow users to export their data

## App Store Requirements

### iOS (App Store):
- Privacy manifest file
- App Store Connect setup
- TestFlight for beta testing
- App Store Review Guidelines compliance
- HealthKit usage description
- Camera usage description
- Photo library access description

### Android (Google Play):
- Privacy policy URL
- Google Play Console setup
- Data safety section completion
- Target API level requirements
- Permissions justification
- Content rating

## Development Phases

### Phase 1: MVP (Minimum Viable Product)
- Basic user authentication
- Manual data logging (food, workouts, weight, sleep, mood)
- Daily Pulse calculation and display
- Simple dashboard
- Dark theme UI

### Phase 2: Core Features
- Camera integration for fridge photos
- Basic AI recipe suggestions
- Health data integration (HealthKit/Google Fit)
- Historical trends and charts
- Push notifications

### Phase 3: Advanced Features
- AI Coach insights
- Challenge system
- Token/wallet integration
- Community features
- Advanced analytics

### Phase 4: Polish & Launch
- Performance optimization
- App store assets (screenshots, descriptions, videos)
- Beta testing
- App store submission
- Marketing materials

## Key Metrics to Track
- Daily Pulse score trends
- User engagement (daily active users)
- Feature usage (which features are most used)
- Retention rates
- Token holder engagement vs. free users

## Success Criteria
- Smooth, intuitive user experience
- Accurate Daily Pulse calculation
- Reliable health data sync
- Fast camera/photo processing
- Beautiful, modern UI matching landing page aesthetic
- Successful app store approvals
- Positive user reviews

## Notes
- Keep the app simple and focused - "No noise. Just signal."
- The Daily Pulse score is the hero feature - make it prominent and meaningful
- Ensure offline functionality for core features
- Consider progressive web app (PWA) as an alternative or supplement
- Plan for scalability as user base grows
