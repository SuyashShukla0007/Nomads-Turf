
# Nomad's Turf

## Overview

Nomad's Turf is an innovative virtual office platform designed to revolutionize remote collaboration, providing an immersive digital workspace for distributed teams, freelancers, and global collaborators.

## Key Features

- **Versatile Virtual Meeting Rooms**: Seamlessly create and join interactive spaces for team discussions and brainstorming
- **Real-Time Communication**: Integrated messaging system enabling instant team interaction
- **Personalized Digital Presence**: Advanced avatar customization for individual expression
- **Robust Collaboration Tools**:
  - Screen sharing for presentations and walkthroughs
  - Interactive whiteboards and sticky notes
  - Direct file and media sharing
- **Secure Authentication**: JWT-based user authentication

## Technology Stack

### Frontend
- React
- Tailwind CSS

### Backend
- Node.js
- WebSocket for real-time communication
- WebRTC for video conferencing

### Database & Infrastructure
- MongoDB
- Deployment: 
  - Vercel (Frontend)
  - Heroku (Backend)

## Local Development Setup

### Prerequisites
- Node.js
- npm
- MongoDB

### Installation Steps

1. Clone the Repository
```bash
git clone https://github.com/SuyashShukla0007/Nomads-Turf.git
cd Nomads-Turf
```

2. Install Dependencies
```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

3. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

4. Launch Development Servers
```bash
# Start frontend
cd frontend
npm start

# Start backend
cd ../backend
npm start
```

## Contribution Guidelines

### How to Contribute

1. **Fork** the [repository](https://github.com/SuyashShukla0007/Nomads-Turf)
2. **Clone** your forked repository
3. **Create** a feature branch
4. **Implement** your changes
5. **Commit** with descriptive messages
6. **Push** your branch
7. **Open** a pull request

### Commit Message Convention
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `refactor:` for code improvements

## Best Practices

- Follow existing code style
- Write clear, concise commit messages
- Include tests for new features
- Document any significant changes

## License
[Add License Information]

## Contact
[Add Contact/Support Information]