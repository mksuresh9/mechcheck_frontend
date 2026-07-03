# Digital Vehicle Inspection Workflow

## Overview

This document describes the comprehensive digital vehicle inspection system implemented in MechCheck. The system enables mechanics to conduct detailed inspections for cars and bikes, tracking multiple components including engine, brakes, tyres, battery, oil condition, and lights, with automatic health score calculation and intelligent recommendations.

## Features

### ✨ Core Features

1. **Multi-Component Inspection**: Comprehensive checklist for engine, brakes, tyres, battery, oil condition, and lights
2. **Image Documentation**: Multiple image uploads per category with compression and storage
3. **Health Score Calculation**: Weighted scoring system based on component conditions
4. **Safety & Performance Scoring**: Separate scoring for critical safety and performance metrics
5. **Intelligent Recommendations**: Priority-based maintenance recommendations with cost estimates
6. **Inspection History Tracking**: Historical data with trend analysis
7. **Vehicle Type Support**: Specific templates for cars and bikes
8. **Status Tracking**: Real-time inspection progress monitoring

### 🎯 Inspection Categories

- **Engine** 🏭: Oil level, coolant, noise, emissions
- **Brakes** 🛑: Pad thickness, fluid level, response, noise
- **Tyres** 🛞: Pressure, tread depth, wear pattern, damage
- **Battery** 🔋: Voltage, terminal condition, age
- **Oil Condition** 🛢️: Color, viscosity, change interval
- **Lights** 💡: Headlights, tail lights, brake lights, signals

### 📊 Health Score System

The health score is calculated using a weighted average of all inspected components:

```
Health Score = (Σ(component_score × weight)) / Σ(weights)

Status Scores:
- Good: 100 points
- Fair: 60 points
- Poor: 20 points
- Not Checked: 50 points (neutral)

Component Weights:
- Brakes: 1.3 (critical)
- Engine: 1.2 (critical)
- Tyres: 1.2 (critical)
- Battery: 1.1 (important)
- Oil: 1.0 (standard)
- Lights: 0.9 (standard)
- General: 0.8 (optional)
```

#### Score Interpretation

- **85-100**: Excellent ✓✓
- **70-84**: Good ✓
- **50-69**: Fair ⚠️
- **30-49**: Poor ✗
- **0-29**: Critical ✗✗

### 🎯 Safety & Performance Scores

**Safety Score** (focuses on critical components):
- Brakes (33%)
- Lights (33%)
- Battery (34%)

**Performance Score** (focuses on performance components):
- Engine (40%)
- Tyres (40%)
- Oil (20%)

### 🚨 Maintenance Urgency Levels

1. **Immediate**: Safety score < 50 or health score < 30
2. **Urgent**: Health score < 50
3. **Soon**: Health score < 70
4. **Routine**: Health score ≥ 70

## Database Schema

### Key Tables

#### `inspection_items`
Stores individual inspection checklist items with statuses and comments.

```sql
Columns:
- id: Primary key
- inspection_request_id: Foreign key to inspection_requests
- category: Component category (Engine, Brakes, etc.)
- item_type: Type of component (engine, brakes, tyres, etc.)
- status: good | fair | poor | not-checked
- comments: Inspector comments
- severity_level: Low, Medium, High, Critical (for poor status)
- recommended_action: Suggested maintenance action
- image_urls: Array of image URLs
```

#### `inspection_images`
Stores images attached to inspection items.

```sql
Columns:
- id: Primary key
- inspection_item_id: Foreign key to inspection_items
- image_url: URL to stored image
- image_type: Type of image (before, after, closeup, etc.)
- description: Image description
- uploaded_at: Upload timestamp
```

#### `inspection_reports`
Comprehensive inspection report with health scores and recommendations.

```sql
Columns:
- id: Primary key
- inspection_request_id: Foreign key
- health_score: Overall health (0-100)
- safety_score: Safety component score (0-100)
- performance_score: Performance component score (0-100)
- overall_condition: Condition description (excellent, good, fair, poor, critical)
- maintenance_urgency: immediate | urgent | soon | routine
- estimated_repair_cost: Estimated repair/maintenance cost
- inspection_categories: JSONB with categorized items
- notes: Additional notes
```

#### `inspection_recommendations`
Structured recommendations with priority and cost estimates.

```sql
Columns:
- id: Primary key
- inspection_report_id: Foreign key
- category: Component category
- priority: critical | high | medium | low
- recommendation: Recommendation text
- estimated_cost: Estimated cost to fix
- parts_required: JSONB array of parts needed
- urgency_days: Days until action needed
```

#### `health_score_history`
Historical tracking of vehicle health scores over time.

```sql
Columns:
- id: Primary key
- vehicle_id: Foreign key
- inspection_report_id: Foreign key
- health_score: Score at inspection
- safety_score: Safety score
- performance_score: Performance score
- recorded_at: Timestamp
```

## API Endpoints

### Inspection Management

#### Get Inspection Template
```
GET /inspections/template/{vehicleType}
```
Returns inspection template for car or bike.

**Response**:
```json
{
  "id": 1,
  "vehicle_type": "car",
  "name": "Comprehensive Car Inspection",
  "checklist_items": [
    {
      "category": "Engine",
      "type": "engine",
      "subchecks": ["Oil level", "Coolant", "Noise", "Emissions"]
    }
  ]
}
```

#### Start Inspection
```
POST /inspections/{bookingId}/start
```

#### Add Inspection Item
```
POST /inspections/{bookingId}/items
```

**Request Body**:
```json
{
  "category": "Engine",
  "item_type": "engine",
  "status": "good",
  "comments": "Engine running smoothly",
  "severity_level": "none",
  "recommended_action": "Regular maintenance",
  "image_urls": ["url1", "url2"]
}
```

#### Get Inspection Items
```
GET /inspections/{bookingId}/items
```

#### Update Inspection Item
```
PUT /inspections/{bookingId}/items/{itemId}
```

#### Get Inspection Details
```
GET /inspections/{bookingId}/details
```

**Response**:
```json
{
  "items": [...],
  "report": {...},
  "healthScore": 85,
  "safetyScore": 90,
  "performanceScore": 80
}
```

#### Get Inspection Report
```
GET /inspections/{bookingId}/report
```

**Response**:
```json
{
  "id": 1,
  "health_score": 85,
  "safety_score": 90,
  "performance_score": 80,
  "overall_condition": "excellent",
  "maintenance_urgency": "routine",
  "estimated_repair_cost": 5000,
  "inspection_categories": {...},
  "inspection_recommendations": [
    {
      "category": "Oil",
      "priority": "medium",
      "recommendation": "Oil change recommended",
      "estimated_cost": 800,
      "urgency_days": 30
    }
  ]
}
```

#### Complete Inspection
```
POST /inspections/{bookingId}/complete
```

**Request Body**:
```json
{
  "notes": "Vehicle is in excellent condition. No major issues found."
}
```

#### Get Vehicle Inspection History
```
GET /inspections/vehicle/{vehicleId}/history?limit=10
```

## Frontend Components

### InspectionForm Component
Comprehensive form for conducting inspections with:
- Expandable category cards
- Status selection
- Severity level for poor conditions
- Comments and recommended actions
- Multiple image uploads with preview
- Real-time progress tracking
- Image compression

**Usage**:
```jsx
<InspectionForm 
  bookingId={bookingId}
  vehicleType="car"
  onComplete={handleInspectionComplete}
/>
```

### InspectionReport Component
Displays inspection results with:
- Health, safety, and performance scores
- Overall condition badge
- Estimated repair costs
- Prioritized recommendations
- Additional notes

**Usage**:
```jsx
<InspectionReport 
  report={report}
  loading={isLoading}
  onDownloadPDF={downloadPDF}
  onPrint={printReport}
/>
```

### InspectionDetailsPage
Full inspection details with:
- Inspection items grid
- Image gallery with lightbox
- Detailed report view
- Tab navigation

**Route**: `/inspections/{bookingId}`

### VehicleInspectionHistoryPage
Vehicle inspection history with:
- Health score trends
- Statistics and averages
- Table and timeline views
- Trend analysis

**Route**: `/vehicles/{vehicleId}/history`

## Frontend Services

### API Service Methods

```javascript
// Get inspection template
getInspectionTemplate(vehicleType)

// Start inspection
startInspection(bookingId)

// Create inspection item
createInspectionItem(bookingId, itemData)

// Get inspection items
getInspectionItems(bookingId)

// Update inspection item
updateInspectionItem(bookingId, itemId, updateData)

// Get inspection details
getInspectionDetails(bookingId)

// Get inspection report
getInspectionReport(bookingId)

// Complete inspection
completeInspection(bookingId, reportData)

// Get vehicle history
getVehicleInspectionHistory(vehicleId, limit)

// Add images
addImages(itemId, formData)
```

## Usage Workflow

### Mechanic Inspection Flow

1. **Load Inspection Form**
   ```
   Mechanic selects vehicle and starts inspection
   ```

2. **Inspect Components**
   ```
   For each category:
   - Select status (good/fair/poor/not-checked)
   - Add comments
   - Upload images
   - Set recommended action if needed
   ```

3. **Submit Inspection**
   ```
   System calculates:
   - Health score
   - Safety score
   - Performance score
   - Generates recommendations
   ```

4. **Review Report**
   ```
   View automatically generated report with:
   - Scores and condition
   - Repair cost estimates
   - Priority recommendations
   - Maintenance urgency
   ```

5. **Share Results**
   ```
   Download PDF or print report
   Send to customer
   ```

### Customer Flow

1. **View Inspection History**
   ```
   Navigate to vehicle inspection history
   ```

2. **View Health Trends**
   ```
   See health score progression over time
   ```

3. **Review Recommendations**
   ```
   View maintenance recommendations
   Schedule services based on priority
   ```

## Recommendation System

The recommendation system works as follows:

1. **Severity Assessment**
   - Poor status → Critical recommendations
   - Fair status → Medium priority recommendations
   - Good status with comments → Low priority suggestions

2. **Cost Estimation**
   Based on component type and severity:
   ```
   Engine (Poor): ₹15,000 | (Fair): ₹5,000
   Brakes (Poor): ₹8,000 | (Fair): ₹3,000
   Tyres (Poor): ₹6,000 | (Fair): ₹2,000
   Battery (Poor): ₹5,000 | (Fair): ₹1,500
   Oil (Poor): ₹2,000 | (Fair): ₹500
   Lights (Poor): ₹1,500 | (Fair): ₹500
   ```

3. **Parts Required**
   Automatically lists parts based on component type

4. **Urgency Calculation**
   - Critical: 1 day
   - High priority: 7 days
   - Medium: 14 days
   - Low: 30 days

## Image Handling

- **Compression**: Automatic compression to 1MB max
- **Format**: JPG, PNG, WebP support
- **Storage**: Cloud storage via backend
- **Preview**: Thumbnail gallery with lightbox

## Performance Optimizations

1. **Database Indexes**
   - `idx_inspection_items_type` on item_type
   - `idx_inspection_items_status` on status
   - `idx_inspection_reports_health` on health_score
   - `idx_vehicles_health` on overall_health_score

2. **Automatic Triggers**
   - Trigger updates vehicle health score on report completion
   - Automatically records health score history

3. **Pagination**
   - Inspection history paginated (default 10, max 50)

## Security Considerations

- All endpoints require authentication
- Image uploads validated for type and size
- Health scores calculated server-side
- Recommendations generated server-side
- Database triggers prevent manual score manipulation

## Error Handling

- Validation errors returned with specific field information
- Image upload failures handled gracefully
- Missing images don't block inspection submission
- Recommendations generated even with partial data

## Testing Checklist

- [ ] Test inspection form with all categories
- [ ] Test image upload and compression
- [ ] Verify health score calculation accuracy
- [ ] Test recommendation generation
- [ ] Check inspection history loading
- [ ] Verify score trend calculations
- [ ] Test PDF generation
- [ ] Verify mobile responsiveness

## Future Enhancements

1. **AI-powered analysis** of inspection images
2. **Predictive maintenance** based on historical trends
3. **Integration with OBD-II** for real-time engine diagnostics
4. **Multi-language support** for inspection templates
5. **GPS tagging** of inspection locations
6. **Blockchain certification** for inspection authenticity
7. **Video inspection** support
8. **Real-time notifications** for critical issues

## Support & Troubleshooting

### Common Issues

**Issue**: Images not uploading
- **Solution**: Check file size (max 1MB after compression), ensure valid image format

**Issue**: Health score seems incorrect
- **Solution**: Verify all components are properly inspected, check weights in service code

**Issue**: Recommendations not generating
- **Solution**: Ensure items have status other than 'not-checked', check server logs

## Contact & Support

For issues or feature requests, contact the development team or create an issue in the repository.
