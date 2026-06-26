import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import DashboardStats from "../components/dashboard/DashboardStats";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";
import RecentMeetings from "../components/dashboard/RecentMeetings";
import QuickActions from "../components/dashboard/QuickActions";
import TeamActivity from "../components/dashboard/TeamActivity";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import ProductivityChart from "../components/dashboard/ProductivityChart";

function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <WelcomeBanner />
      <DashboardStats />
      <QuickActions />
      <UpcomingMeetings />
      <RecentMeetings />
      <TeamActivity />
      <AIInsightsCard />
      <ProductivityChart />
    </>
  );
}

export default Dashboard;
