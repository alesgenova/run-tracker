from django.conf.urls import url


from api import views

urlpatterns = [
    url(r'^entries/$', views.EntryList.as_view(), name="entry_list"),
    url(r'^entry/(?P<pk>[0-9]+)/$', views.EntryDetail.as_view(), name="entry_detail"),
    url(r'^users/$', views.UserList.as_view(), name="user_list"),
    url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name="user_detail"),
    url(r'^me/$', views.Myself.as_view(), name="myself"),
]
