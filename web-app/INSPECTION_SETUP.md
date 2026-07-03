# Inspection Workflow - Implementation Guide

## Installation & Setup

### Prerequisites

- Node.js 16+ (Backend)
- PostgreSQL 12+
- React 18+ (Frontend)
- Supabase account or PostgreSQL database

### Backend Setup

#### 1. Install Dependencies

No new dependencies are required as the enhancement uses existing packages.

#### 2. Apply Database Migration

Run the migration to create new tables and add columns:

```bash
# Using Supabase CLI
supabase db push migrations/001_enhance_inspection_workflow.sql

# Or using psql directly
psql -U username -d database_name -f migrations/001_enhance_inspection_workflow.sql

# Or using your Node.js migration tool
node scripts/runMigration.js migrations/001_enhance_inspection_workflow.sql
```

#### 3. Configuration

Update environment variables if needed:

```env
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mechcheck
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

#### 4. Verify Setup

Test the backend by hitting the inspection endpoints:

```bash
# Get inspection template
curl -X GET http://localhost:3000/inspections/template/car \
  -H "Authorization: Bearer YOUR_TOKEN"

# Response should include template with checklist items
```

### Frontend Setup

#### 1. Install Image Compression Library

```bash
cd mechcheck-frontend
npm install browser-image-compression
```

#### 2. Add Routes (if not already configured)

Update your routing file to include inspection pages:

```jsx
// In your router configuration (e.g., App.jsx or routes/index.jsx)
import InspectionDetailsPage from './pages/InspectionDetailsPage';
import VehicleInspectionHistoryPage from './pages/VehicleInspectionHistoryPage';

const routes = [
  // ... existing routes ...
  {
    path: '/inspections/:bookingId',
    component: InspectionDetailsPage,
  },
  {
    path: '/vehicles/:vehicleId/history',
    component: VehicleInspectionHistoryPage,
  },
];
```

#### 3. Update Navigation

Add links to inspection features in your navigation menu:

```jsx
// In your navigation component
<Link to={`/vehicles/${vehicleId}/history`}>
  Inspection History
</Link>
```

### Database Schema Verification

Verify that all tables were created:

```sql
-- Check if new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'inspection_images',
  'inspection_recommendations',
  'health_score_history',
  'inspection_templates'
);

-- Verify templates were inserted
SELECT * FROM inspection_templates;

-- Should return 2 rows (car and bike templates)
```

## Configuration Options

### Customize Inspection Categories

Edit `INSPECTION_CATEGORIES` in `InspectionForm.jsx`:

```javascript
const INSPECTION_CATEGORIES = {
  engine: {
    label: 'Engine',
    icon: '⚙️',
    color: '#FF6B6B',
    checks: [
      'Engine oil level',
      // Add more checks...
    ],
  },
  // Add more categories...
};
```

### Customize Health Score Weights

Edit weights in `inspectionService.js`:

```javascript
const categoryWeights = {
  brakes: 1.3,   // Increase/decrease weight
  engine: 1.2,
  battery: 1.1,
  lights: 0.9,
  tyres: 1.2,
  oil: 1.0,
  general: 0.8,
};
```

### Customize Cost Estimates

Edit `estimateRepairCost()` in `inspectionService.js`:

```javascript
const costMap = {
  engine: { poor: 15000, fair: 5000 },    // Update costs
  brakes: { poor: 8000, fair: 3000 },
  // ...
};
```

## Integration with Existing Features

### Link Inspections to Bookings

The inspection system is integrated with existing booking system:

1. **Booking → Inspection**: When a booking is accepted, a mechanic can start the inspection
2. **Inspection → Report**: Once completed, a report is generated
3. **Report → Vehicle Health**: Vehicle health score is automatically updated

### Database Relationships

```
Booking (inspection_requests)
  ├── Inspection Items (inspection_items)
  │   ├── Images (inspection_images)
  │   └── Report (inspection_reports)
  │       ├── Recommendations (inspection_recommendations)
  │       └── Health History (health_score_history)
  └── Vehicle (vehicles)
      └── Health Tracking
```

## API Integration Examples

### Complete Inspection Flow

```javascript
// 1. Start inspection
await startInspection(bookingId);

// 2. Add items for each category
await createInspectionItem(bookingId, {
  category: 'Engine',
  item_type: 'engine',
  status: 'good',
  comments: 'Engine running smoothly',
  image_urls: ['url1', 'url2'],
});

// 3. Complete inspection
const result = await completeInspection(bookingId, {
  notes: 'Vehicle is in good condition',
});

// 4. Get inspection details
const details = await getInspectionDetails(bookingId);
console.log('Health Score:', details.healthScore);
console.log('Recommendations:', details.report.inspection_recommendations);
```

### View Inspection History

```javascript
// Get inspection history for a vehicle
const history = await getVehicleInspectionHistory(vehicleId, 10);

// Process results
history.forEach((record) => {
  console.log(`Score: ${record.health_score}, Date: ${record.recorded_at}`);
});
```

## Testing

### Unit Tests Example

```javascript
// Test health score calculation
describe('InspectionService', () => {
  it('should calculate health score correctly', () => {
    const items = [
      { item_type: 'engine', status: 'good' },
      { item_type: 'brakes', status: 'fair' },
      { item_type: 'tyres', status: 'good' },
    ];
    
    const score = inspectionService.calculateHealthScore(items);
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThan(100);
  });
});
```

### Manual Testing Checklist

- [ ] Create inspection for car
- [ ] Create inspection for bike
- [ ] Test all status options (good/fair/poor)
- [ ] Upload images and verify compression
- [ ] Complete inspection and verify health score
- [ ] Check recommendations generation
- [ ] View inspection history
- [ ] Verify health score trends
- [ ] Test with empty inspections
- [ ] Test with partial inspections

## Deployment

### Backend Deployment

1. **Run migration** on production database
2. **Verify templates** are inserted
3. **Test endpoints** on production
4. **Monitor logs** for any issues

### Frontend Deployment

1. **Build project**: `npm run build`
2. **Deploy assets** to hosting
3. **Verify routes** work correctly
4. **Test image uploads** on CDN
5. **Performance test** with real data

## Monitoring & Maintenance

### Key Metrics to Monitor

- Average inspection time
- Most common issues found
- Health score distribution
- Recommendation acceptance rate
- Image upload success rate

### Regular Tasks

- [ ] Clean up old images (if needed)
- [ ] Review cost estimates (quarterly)
- [ ] Update inspection templates based on feedback
- [ ] Archive old inspection records (annual)
- [ ] Backup database regularly

## Troubleshooting Guide

### Issue: Migration fails

**Solution**:
1. Check database permissions
2. Verify PostgreSQL version compatibility
3. Check for conflicting column names
4. Run migration step by step

### Issue: Images not uploading

**Solution**:
1. Check file size (max 1MB)
2. Verify MIME type
3. Check storage permissions
4. Review browser console for errors

### Issue: Health scores not calculating

**Solution**:
1. Verify inspection items have status
2. Check weights in service
3. Review database triggers
4. Check server logs for errors

### Issue: Recommendations not generating

**Solution**:
1. Verify items have status != 'not-checked'
2. Check recommendation generation logic
3. Verify DB insert permissions
4. Review error logs

## Performance Tuning

### Database Optimization

```sql
-- Analyze tables for better query planning
ANALYZE inspection_items;
ANALYZE inspection_reports;
ANALYZE health_score_history;

-- Vacuum to reclaim space
VACUUM inspection_items;
```

### Frontend Optimization

- Lazy load inspection pages
- Paginate inspection history
- Compress images before upload
- Cache inspection templates

## Backup & Recovery

### Backup Database

```bash
# Full backup
pg_dump mechcheck > backup.sql

# Backup specific table
pg_dump -t inspection_reports mechcheck > reports_backup.sql
```

### Restore Database

```bash
# Restore full backup
psql mechcheck < backup.sql

# Restore specific table
psql mechcheck < reports_backup.sql
```

## Documentation Links

- [Database Schema](./INSPECTION_WORKFLOW.md#database-schema)
- [API Endpoints](./INSPECTION_WORKFLOW.md#api-endpoints)
- [Components](./INSPECTION_WORKFLOW.md#frontend-components)
- [Troubleshooting](./INSPECTION_WORKFLOW.md#support--troubleshooting)

## Support

For issues or questions:
1. Check the troubleshooting guide above
2. Review application logs
3. Contact development team
4. Create an issue in the repository

## Version History

- **v1.0.0** (Current): Initial comprehensive inspection workflow
  - Multi-component inspection
  - Health scoring system
  - Recommendation engine
  - Image support
  - History tracking
