"use client";

import { Bell, Package, Truck, CreditCard, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface NotificationPopupProps {
  children: React.ReactNode;
}

interface Notification {
  id: string;
  type: "orders" | "deliveries" | "payment" | "all";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "orders",
    title: "New Order Received",
    message: "Order #12345 has been placed successfully",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "deliveries",
    title: "Delivery Update",
    message: "Your delivery is out for delivery",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    message: "Payment of $250 has been processed",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "all",
    title: "System Update",
    message: "System maintenance scheduled for tonight",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "orders",
    title: "Order Cancelled",
    message: "Order #12346 has been cancelled by customer",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "6",
    type: "deliveries",
    title: "Delivery Completed",
    message: "Package delivered to customer address",
    time: "6 hours ago",
    read: true,
  },
];

const NotificationPopup: React.FC<NotificationPopupProps> = ({ children }) => {
  const getNotificationsByType = (type: string) => {
    if (type === "all") {
      return mockNotifications;
    }
    return mockNotifications.filter(
      (notification) => notification.type === type
    );
  };

  const getUnreadCount = () => {
    return mockNotifications.filter((notification) => !notification.read)
      .length;
  };

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <div
      className={`p-8 cursor-pointer 
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-11 w-11 flex items-center justify-center rounded-full ${
            notification.type === "orders"
              ? "bg-white text-[#3B82F6] border shadow-sm"
              : notification.type === "deliveries"
              ? "bg-white text-[#7C3AED] border shadow-sm"
              : notification.type === "payment"
              ? "bg-white text-[#F3A216] border shadow-sm"
              : "bg-white border shadow-sm"
          }`}
        >
          {notification.type === "orders" && <List size={20} />}
          {notification.type === "deliveries" && <Truck size={20} />}
          {notification.type === "payment" && <CreditCard size={20} />}
          {notification.type === "all" && <Bell size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-medium text-gray-900 truncate">
                {notification.title}
              </p>
              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
            </div>

            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          {children}
          {getUnreadCount() > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {getUnreadCount()}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[480px] h-[584px] p-0 ml-6 rounded-3xl"
        align="center"
        sideOffset={8}
      >
        <div className="px-4 py-3 ">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {/* <span className="text-sm text-gray-500">
              {getUnreadCount()} unread
            </span> */}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full bg-transparent grid-cols-4 shadow-none rounded-none border-b">
            <TabsTrigger
              value="all"
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6A00] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-b-lg  bg-transparent shadow-none"
            >
              {/* <List size={16} /> */}
              <span className="text-sm text-[var(--gray-600)] ">All</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6A00] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-b-lg  bg-transparent shadow-none"
            >
              {/* <Package size={16} /> */}
              <span className=" text-sm text-[var(--gray-600)]">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="deliveries"
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6A00] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-b-lg bg-transparent shadow-none"
            >
              {/* <Truck size={16} /> */}
              <span className=" text-sm text-[var(--gray-600)] ">
                Deliveries
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6A00] data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-b-lg  bg-transparent shadow-none"
            >
              {/* <CreditCard size={16} /> */}
              <span
                className="text-sm text-[var(--gray-600)] 
              "
              >
                Payment
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="max-h-[587px] overflow-y-auto">
              {getNotificationsByType("all").length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell size={24} className="mx-auto mb-2 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {getNotificationsByType("all").map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <div className="max-h-[587px] overflow-y-auto">
              {getNotificationsByType("orders").length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Package size={24} className="mx-auto mb-2 text-gray-300" />
                  <p>No order notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {getNotificationsByType("orders").map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="deliveries" className="mt-0">
            <div className="max-h-[587px] overflow-y-auto">
              {getNotificationsByType("deliveries").length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Truck size={24} className="mx-auto mb-2 text-gray-300" />
                  <p>No delivery notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {getNotificationsByType("deliveries").map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <div className="max-h-[587px] overflow-y-auto">
              {getNotificationsByType("payment").length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <CreditCard
                    size={24}
                    className="mx-auto mb-2 text-gray-300"
                  />
                  <p>No payment notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {getNotificationsByType("payment").map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* <div className="p-3 border-t border-gray-200">
          <button className="w-full text-sm text-[var(--primary-400)] hover:text-[var(--primary-500)] font-medium py-2">
            View All Notifications
          </button>
        </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationPopup;
