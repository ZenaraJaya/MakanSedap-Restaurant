from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["GET"])
def analytics(request):
    """Return analytics data for the dashboard"""
    
    analytics_data = {
        "total_orders": 48,
        "total_revenue": 18450,
        "active_users": 156,
        "avg_order_value": 384,
        "daily_orders": [
            {"date": "Mon", "count": 32},
            {"date": "Tue", "count": 28},
            {"date": "Wed", "count": 41},
            {"date": "Thu", "count": 35},
            {"date": "Fri", "count": 48},
            {"date": "Sat", "count": 52},
            {"date": "Sun", "count": 38},
        ],
        "category_sales": [
            {"category": "Pizza", "sales": 5200},
            {"category": "Pasta", "sales": 4100},
            {"category": "Drinks", "sales": 3850},
            {"category": "Desserts", "sales": 2300},
            {"category": "Salads", "sales": 3000},
        ],
    }
    
    return JsonResponse(analytics_data)