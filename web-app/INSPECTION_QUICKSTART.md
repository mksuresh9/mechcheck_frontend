# Inspection Workflow - Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Git
- Supabase or PostgreSQL access

### Step 1: Database Setup (2 minutes)

```bash
# Copy migration file
cp meckcheck-backend/migrations/001_enhance_inspection_workflow.sql

# Connect to your database
psql -U username -d mechcheck_db

# Run migration
\i migrations/001_enhance_inspection_workflow.sql

# Verify (should see 2 rows)
SELECT COUNT(*) FROM inspection_templates;
```

### Step 2: Backend Dependencies (1 minute)

No new dependencies needed! All packages already exist:
- Express
- Supabase
- Validation utilities

### Step 3: Frontend Dependencies (1 minute)

```bash
cd mechcheck-frontend
npm install browser-image-compression
```

### Step 4: Start Using (1 minute)

Import and use in your components:

```jsx
import InspectionForm from './components/InspectionForm';
import InspectionReport from './components/InspectionReport';
import InspectionDetailsPage from './pages/InspectionDetailsPage';

// Use in your app
<InspectionForm bookingId={bookingId} vehicleType="car" />
```

---

## 📋 File Checklist

### Backend Files Created/Modified
- ✅ `migrations/001_enhance_inspection_workflow.sql` - Database migration
- ✅ `src/services/inspectionService.js` - Enhanced service
- ✅ `src/controllers/inspectionController.js` - New methods
- ✅ `src/routes/inspectionRoutes.js` - New routes

### Frontend Files Created/Modified
- ✅ `src/components/InspectionForm.jsx` - Inspection form
- ✅ `src/components/InspectionReport.jsx` - Report display
- ✅ `src/pages/InspectionDetailsPage.jsx` - Details page
- ✅ `src/pages/VehicleInspectionHistoryPage.jsx` - History page
- ✅ `src/services/apiService.js` - API methods

### Documentation Files Created
- ✅ `INSPECTION_WORKFLOW.md` - Complete documentation
- ✅ `INSPECTION_SETUP.md` - Implementation guide
- ✅ `INSPECTION_USER_GUIDE.md` - User guide
- ✅ `INSPECTION_VISUAL_GUIDE.md` - Visual guide
- ✅ `INSPECTION_IMPLEMENTATION_SUMMARY.md` - Summary

---

## 🔧 Common Tasks

### Add Inspection Form to Booking Page

```jsx
import InspectionForm from '../components/InspectionForm';

function BookingDetailPage() {
  const { bookingId } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    // Load vehicle to get vehicle type
    fetchVehicleData();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Booking #{bookingId}</Typography>
      {vehicle && (
        <InspectionForm
          bookingId={bookingId}
          vehicleType={vehicle.vehicle_type} // 'car' or 'bike'
          onComplete={() => {
            // Refresh page or navigate
            window.location.reload();
          }}
        />
      )}
    </Box>
  );
}
```

### Display Inspection Report

```jsx
import InspectionReport from '../components/InspectionReport';
import { getInspectionReport } from '../services/apiService';

function ReportView() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getInspectionReport(bookingId);
        setReport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [bookingId]);

  return <InspectionReport report={report} loading={loading} />;
}
```

### View Inspection History

```jsx
import VehicleInspectionHistoryPage from '../pages/VehicleInspectionHistoryPage';

// In your router
{
  path: '/vehicles/:vehicleId/history',
  element: <VehicleInspectionHistoryPage />
}

// Link from vehicle page
<Link to={`/vehicles/${vehicle.id}/history`}>
  View Inspection History
</Link>
```

---

## 🧪 Quick Test

### Test the API

```bash
# Get inspection template
curl -X GET http://localhost:3000/inspections/template/car \
  -H "Authorization: Bearer YOUR_TOKEN"

# Expected response:
# {
#   "id": 1,
#   "vehicle_type": "car",
#   "name": "Comprehensive Car Inspection",
#   "checklist_items": [...]
# }

# Start inspection
curl -X POST http://localhost:3000/inspections/1/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

# Add inspection item
curl -X POST http://localhost:3000/inspections/1/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Engine",
    "item_type": "engine",
    "status": "good",
    "comments": "Running smoothly"
  }'

# Complete inspection
curl -X POST http://localhost:3000/inspections/1/complete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"notes": "Vehicle in good condition"}'

# Get inspection details
curl -X GET http://localhost:3000/inspections/1/details \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Health Score Quick Reference

```javascript
// Import the service
import inspectionService from './services/inspectionService';

// Calculate scores
const items = [
  { item_type: 'engine', status: 'good' },
  { item_type: 'brakes', status: 'fair' },
  { item_type: 'tyres', status: 'good' },
];

const healthScore = inspectionService.calculateHealthScore(items);
const safetyScore = inspectionService.calculateSafetyScore(items);
const performanceScore = inspectionService.calculatePerformanceScore(items);

console.log('Health:', healthScore);      // 85-90
console.log('Safety:', safetyScore);      // 80-90
console.log('Performance:', performanceScore); // 80-90
```

---

## 🎨 Component Props Reference

### InspectionForm

```jsx
<InspectionForm
  bookingId="123"              // Required: Booking ID
  vehicleType="car"           // Required: 'car' or 'bike'
  onComplete={() => {}}       // Optional: Callback on completion
/>
```

**Features:**
- Expandable category cards
- Image upload with compression
- Real-time progress tracking
- Validation

### InspectionReport

```jsx
<InspectionReport
  report={reportData}         // Required: Report object from API
  loading={false}             // Optional: Loading state
  onDownloadPDF={() => {}}    // Optional: PDF download handler
  onPrint={() => {}}          // Optional: Print handler
/>
```

**Displays:**
- Health, Safety, Performance scores
- Condition badges
- Cost estimates
- Prioritized recommendations

### InspectionDetailsPage

```jsx
// Routes like:
<Route 
  path="/inspections/:bookingId" 
  element={<InspectionDetailsPage />} 
/>
```

**Features:**
- Tab-based interface (Items | Report)
- Image gallery
- Full inspection details

### VehicleInspectionHistoryPage

```jsx
// Routes like:
<Route 
  path="/vehicles/:vehicleId/history" 
  element={<VehicleInspectionHistoryPage />} 
/>
```

**Features:**
- Statistics cards
- Table and timeline views
- Trend analysis

---

## 🔌 API Methods Reference

```javascript
import {
  getInspectionTemplate,
  startInspection,
  createInspectionItem,
  getInspectionItems,
  updateInspectionItem,
  getInspectionDetails,
  getInspectionReport,
  completeInspection,
  getVehicleInspectionHistory,
  addImages,
} from '../services/apiService';

// Get template
const template = await getInspectionTemplate('car');

// Start inspection
await startInspection(bookingId);

// Add item
const item = await createInspectionItem(bookingId, {
  category: 'Engine',
  item_type: 'engine',
  status: 'good',
  comments: 'Good condition',
});

// Get items
const items = await getInspectionItems(bookingId);

// Update item
await updateInspectionItem(bookingId, itemId, { status: 'fair' });

// Get details
const details = await getInspectionDetails(bookingId);

// Get report
const report = await getInspectionReport(bookingId);

// Complete
const result = await completeInspection(bookingId, { notes: 'Done' });

// History
const history = await getVehicleInspectionHistory(vehicleId, 10);

// Add images
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);
await addImages(itemId, formData);
```

---

## 🐛 Common Issues & Solutions

### Issue: Templates not loading
```javascript
// Check templates exist
SELECT * FROM inspection_templates;
// Should return 2 rows (car, bike)
```

### Issue: Images not uploading
```javascript
// Check file size
const maxSize = 1024 * 1024; // 1MB
if (file.size > maxSize) {
  console.log('File too large');
}

// Check MIME type
const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!validTypes.includes(file.type)) {
  console.log('Invalid image type');
}
```

### Issue: Health score calculation off
```javascript
// Verify weights sum correctly
const weights = {
  engine: 1.2,
  brakes: 1.3,
  tyres: 1.2,
  battery: 1.1,
  oil: 1.0,
  lights: 0.9,
  general: 0.8,
};
console.log(Object.values(weights).reduce((a, b) => a + b)); // Should be 6.7
```

---

## 📚 Documentation Links

- **Full Workflow**: See [INSPECTION_WORKFLOW.md](./INSPECTION_WORKFLOW.md)
- **Setup Guide**: See [INSPECTION_SETUP.md](./INSPECTION_SETUP.md)
- **User Guide**: See [INSPECTION_USER_GUIDE.md](./INSPECTION_USER_GUIDE.md)
- **Visual Guide**: See [INSPECTION_VISUAL_GUIDE.md](./INSPECTION_VISUAL_GUIDE.md)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Database migration applied
- [ ] Templates exist in DB (SELECT COUNT(*) FROM inspection_templates)
- [ ] Node dependencies installed
- [ ] Browser-image-compression installed
- [ ] Routes configured
- [ ] Components imported correctly
- [ ] API service methods working
- [ ] Form can submit
- [ ] Report generates correctly
- [ ] History page shows data

---

## 🎯 Next Steps

1. **Apply database migration** - Run SQL migration
2. **Install dependencies** - `npm install browser-image-compression`
3. **Configure routes** - Add inspection routes
4. **Test workflow** - Try complete inspection
5. **Deploy** - Push to staging/production

---

## 💡 Tips

- Start with car inspection to test workflow
- Use Postman to test API endpoints
- Check browser console for client errors
- Check server logs for API errors
- Use database browser to verify data

---

## 📞 Need Help?

1. Check the relevant documentation file
2. Review code comments in components
3. Check server/browser console for errors
4. Verify database schema
5. Contact development team

---

**Ready to go!** 🚀

Start by running the database migration, then integrate the components into your app.
