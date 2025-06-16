# Inventory Management Dashboard

## About Assignment

This project is a dashboard for inventory management of a commodities-based multinational corporation (MNC). The dashboard provides sales data for both historical and forecast periods, using mock data for demonstration purposes. The frontend is designed to be dynamic, interactive, and responsive, closely following a provided design specification.

---

## Features

### Landing Page

- **Dynamic World Map:**
  - Interactive map background with zoom along with scroll capabilities.
  - At least two cities are displayed as interactable points.
  - Hovering over a city point shows a tooltip with the city's name and current metrics (from mock data).
- **City Widgets:**
  - Responsive widgets that adapt to various screen sizes.
  - Widgets display city metrics and a miniature line chart.
  - Scrollbar appears if more than six widgets are present, allowing horizontal or vertical scrolling within the widget area.
  - Widget alignment (right, left, top, bottom) is configurable.
  - Hovering over a chart shows a tooltip with detailed information.
  - Clicking a widget navigates to the details page for that city.

### Details Page

- **Sidebar Section:**
  - Sidebar contains stack cards populated with mock data.
  - Sidebar can be expanded or collapsed.
  - Back button navigates to the landing page.
  - Selecting a card updates rest of the data.
- **Chart Section:**
  - Main chart visualizes data based on sidebar selection.
  - Switches allow toggling chart lines.
  - Tooltips on hover provide detailed data for each quarter.
- **Table Section:**
  - Table data is synchronized with the chart and sidebar selection.
  - Displays three rows for data shown in the chart.

---

## Project Structure

```
my-app/
├── components/
│   ├── landing-page/
│   ├── details-page/
│   └── navbar/
├── configurations/
│   ├── sideBarConfig.json
│   ├── widgetConfig.json
│   └── chartConfig.json
├── mock-data/
│   ├── cityData.json
│   ├── chartData.json
│   ├── detailsChartTableData.json
│   └── countriesData.json
└── ... (other files)
```

- **components/**: Components for landing page, details page, and navbar.
- **configurations/**: JSON files for sidebar, widget, and chart configuration.
- **mock-data/**: Contains all mock data used for cities, charts, and tables.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Navigate to `http://localhost:3000` to view the dashboard.

---
