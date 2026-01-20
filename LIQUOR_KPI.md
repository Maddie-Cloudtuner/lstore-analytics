# Liquor Store Analytics - KPI Documentation

## Overview
This document defines the Key Performance Indicators (KPIs) for the **Liquor Store Analytics** dashboard. The system enables liquor retail chains to conduct automated store audits using AI-powered CCTV analysis, focusing on age verification compliance, theft prevention, and operational efficiency.

> [!IMPORTANT]
> Liquor stores have strict regulatory requirements: mandatory age verification, intoxication monitoring, and compliance with local liquor laws.

---

## Target Clients
- **Wine & Spirits Retailers** - Premium liquor stores
- **Package Stores** - General liquor retail
- **Craft Beer Shops** - Specialty beverage retailers
- **Supermarket Liquor Sections** - Grocery store alcohol departments
- **Convenience Store Liquor** - Licensed quick-marts

---

## Store Zones (Liquor Store Specific)

| Zone | Camera | Key KPIs |
|------|--------|----------|
| **Entrance/Exit** | CAM-01 | Age verification, ID check compliance, footfall |
| **Spirits Section** | CAM-02 | High-value theft prevention, customer engagement |
| **Wine Section** | CAM-03 | Display compliance, product interaction |
| **Beer & Cooler** | CAM-04 | Cooler status, stock levels, temperature |
| **Checkout Counter** | CAM-05 | Queue time, ID check, transaction compliance |
| **Storage/Backroom** | CAM-06 | Unauthorized access, inventory movement |

---

## KPI Categories

### 🔴 CRITICAL KPIs

| KPI Name | Description | Threshold | Detection Method |
|----------|-------------|-----------|------------------|
| **Age Verification Missing** | Sale without ID check | Any violation | Person tracking + transaction |
| **Intoxicated Customer Service** | Serving visibly intoxicated person | Any detection | Behavior analysis |
| **After-Hours Activity** | Unauthorized store access | Any violation | Time + person detection |
| **Theft/Concealment** | Product concealment or theft attempt | Any detection | Object tracking + anomaly |
| **Violence/Altercation** | Physical conflict in store | Any detection | Behavior analysis |
| **Cash Drawer Unattended** | Register open without cashier | >30 seconds | Object detection |

### 🟠 HIGH KPIs

| KPI Name | Description | Threshold | Detection Method |
|----------|-------------|-----------|------------------|
| **ID Check Not Performed** | Customer at checkout, no ID verification | Any skip | Behavior + transaction analysis |
| **Staff Not in Zone** | No coverage in checkout area | >3 minutes | Person tracking |
| **Queue Threshold Exceeded** | Long wait at checkout | >5 min / >4 people | Queue detection |
| **Suspicious Loitering** | Extended time in high-value area | >5 minutes | Dwell time analysis |
| **Cooler Door Open Too Long** | Door left open, temperature risk | >60 seconds | Object detection |
| **Unauthorized Backroom Access** | Non-staff entering storage | Any violation | Person classification |

### 🟡 MEDIUM KPIs

| KPI Name | Description | Threshold | Detection Method |
|----------|-------------|-----------|------------------|
| **Staff Phone Usage** | Personal device during shift | >2 min duration | Object detection |
| **Uniform/Apron Missing** | Staff without proper attire | Any detection | Uniform detection |
| **Display Compliance Issue** | Products not in designated spots | <90% compliance | Object detection |
| **Promotional Material Missing** | Missing signage or displays | Any missing | Text/object detection |
| **Customer Assistance Needed** | Customer looking confused/waiting | Body language | Pose estimation |
| **Price Tag Missing** | Product without visible pricing | Any detection | Text detection |

### 🟢 LOW KPIs

| KPI Name | Description | Threshold | Detection Method |
|----------|-------------|-----------|------------------|
| **Floor Cleanliness** | Spills or debris | Any detection | Floor anomaly |
| **Signage Visibility** | Regulatory signs visible | <95% | Text detection |
| **Lighting Issues** | Inadequate lighting | Below threshold | Brightness analysis |
| **Break Room Overcrowding** | Too many staff on break | >capacity | People counting |

---

## Liquor-Specific Metrics

### Age Verification Compliance
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| ID Check Rate (under 30) | 100% | <100% |
| ID Check Rate (all) | >90% | <85% |
| Verification Time | <30 sec | >45 sec |
| Refusal Rate (minors) | 100% | <100% |

### Inventory & Security
| Category | Theft Risk | Monitoring Priority |
|----------|------------|---------------------|
| Premium Spirits | 🔴 Very High | Continuous |
| Wine (Fine) | 🔴 Very High | Continuous |
| Champagne | 🟠 High | High |
| Craft Spirits | 🟠 High | High |
| Standard Wine | 🟡 Medium | Standard |
| Beer | 🟢 Low | Periodic |

### Store Operations
| Zone | Ideal Dwell Time | Staff Requirement |
|------|------------------|-------------------|
| Checkout | 2-4 min | 1-2 staff |
| Spirits | 3-5 min | 1 staff |
| Wine | 5-10 min | Optional |
| Beer/Cooler | 2-3 min | Optional |

---

## Dashboard Sections

### 1. Store Overview
- **Metrics**: Store health, footfall, compliance score, active alerts
- **Focus**: Age verification status, high-value security
- **Visualization**: Health gauge, compliance meters

### 2. Inventory Status
- **Metrics**: Stock levels by category, cooler temperatures, display compliance
- **KPIs**: Cooler Status, Stock Alerts, Display Issues
- **Visualization**: Category grid, temperature gauges

### 3. Age Verification
- **Metrics**: ID check rate, verification time, refusal tracking
- **KPIs**: Age Check Compliance, Verification Speed, Minor Attempts
- **Visualization**: Compliance counters, verification log

### 4. Staff Compliance
- **Metrics**: Zone coverage, uniform compliance, phone usage
- **KPIs**: Staff in Zone, Uniform OK, Phone Detection
- **Visualization**: Staff cards, zone coverage map

### 5. Customer Experience
- **Metrics**: Queue time, service speed, customer satisfaction
- **KPIs**: Queue Threshold, Service Time, Conversion
- **Visualization**: Queue bars, service metrics

### 6. Security & Loss Prevention
- **Metrics**: Theft attempts, suspicious behavior, after-hours alerts
- **KPIs**: Concealment, Loitering, Unauthorized Access
- **Visualization**: Incident feed, risk heatmap

### 7. Cameras
- **Metrics**: Camera status, live feeds, zone coverage
- **Visualization**: Camera selector, live preview

### 8. Live Analysis (NEW)
- **Metrics**: Real-time AI interpretation of video stream
- **Features**: Frame analysis, detection overlays, compliance scoring
- **Visualization**: Split view with camera and AI analysis panel

### 9. LIQUOR-GPT
- **Metrics**: AI-powered insights and queries
- **Features**: Natural language queries, report generation
- **Visualization**: Chat interface, quick actions

---

## AI Detection Models Required

| Model | Use Case | Priority |
|-------|----------|----------|
| YOLOv8 | Person/Object detection | Critical |
| Age Estimation | Apparent age classification | Critical |
| ID Detection | ID card recognition | Critical |
| Behavior Analysis | Intoxication/suspicious behavior | High |
| Queue Detector | Checkout line management | High |
| Bottle Detection | Product tracking | High |
| Uniform Classifier | Staff identification | Medium |
| Temperature OCR | Cooler temp reading | Medium |

---

## Regulatory Compliance Notes

1. **Age Verification**: 100% ID check required for anyone appearing under 30
2. **Refusal Documentation**: All refusals should be logged
3. **Intoxication Check**: Staff must refuse service to visibly intoxicated persons
4. **Hours of Operation**: Strict adherence to licensed hours
5. **Camera Coverage**: All transaction areas must be monitored

---

## Success Metrics

| Metric | Target | Business Impact |
|--------|--------|-----------------|
| Age Verification Rate | 100% | Regulatory compliance |
| Shrinkage Reduction | -35% | Direct P&L impact |
| Queue Wait Time | <3 min | Customer satisfaction |
| Staff Zone Coverage | 100% | Loss prevention |
| Compliance Score | >95% | License protection |

---

## Document History
- **Version**: 1.0 - Liquor Store Focus
- **Created**: January 20, 2026
- **Target Stores**: Wine & Spirits, Package Stores, Licensed Retailers
