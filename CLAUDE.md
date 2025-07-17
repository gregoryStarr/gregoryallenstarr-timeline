# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal timeline application project for Gregory Allen Starr. Currently in initial development phase with a simple HTML landing page. The project plan (detailed in `tasks.md`) outlines building an interactive timeline application to showcase career progression and projects.

## Current Project State

- **Status**: Early development phase with basic HTML landing page
- **Main file**: `index.html` - Simple coming soon page with gradient background and glassmorphism design
- **Planning**: Comprehensive development plan in `tasks.md` with 5-phase approach

## Planned Technology Stack

According to `tasks.md`, the project will use:
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components  
- **Backend**: Express.js API
- **Animation**: Framer Motion
- **Data Sources**: Resume data + GitHub API integration

## Key Project Goals

1. **Interactive Timeline**: Scrubber interface for navigating career timeline
2. **Project Showcase**: Rich cards displaying projects with technology stacks
3. **GitHub Integration**: Live repository data and commit history
4. **Responsive Design**: Mobile-first with desktop enhancements
5. **Professional Portfolio**: Suitable for showcasing career progression

## Development Commands

*Note: No package.json exists yet - commands will be available after project setup*

## Architecture Notes

- Project is currently just a static HTML page
- Full application architecture will follow React/Express pattern once development begins
- Timeline scrubber will be the core interactive component
- Data integration planned for GitHub API and resume parsing

## File Structure

```
/
├── index.html          # Current landing page
├── 404.html           # Error page
├── tasks.md           # Comprehensive development plan
└── docs/              # Documentation folder
    └── primaryResume2025.docx
```