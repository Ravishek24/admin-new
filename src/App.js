import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import HomePageTwo from "./pages/HomePageTwo";
import HomePageThree from "./pages/HomePageThree";
import HomePageFour from "./pages/HomePageFour";
import HomePageFive from "./pages/HomePageFive";
import HomePageSix from "./pages/HomePageSix";
import HomePageSeven from "./pages/HomePageSeven";
import EmailPage from "./pages/EmailPage";
import AddUserPage from "./pages/AddUserPage";
import AlertPage from "./pages/AlertPage";
import AssignRolePage from "./pages/AssignRolePage";
import AvatarPage from "./pages/AvatarPage";
import BadgesPage from "./pages/BadgesPage";
import ButtonPage from "./pages/ButtonPage";
import CalendarMainPage from "./pages/CalendarMainPage";
import CardPage from "./pages/CardPage";
import CarouselPage from "./pages/CarouselPage";
import ChatEmptyPage from "./pages/ChatEmptyPage";
import ChatMessagePage from "./pages/ChatMessagePage";
import ChatProfilePage from "./pages/ChatProfilePage";
import CodeGeneratorNewPage from "./pages/CodeGeneratorNewPage";
import CodeGeneratorPage from "./pages/CodeGeneratorPage";
import ColorsPage from "./pages/ColorsPage";
import ColumnChartPage from "./pages/ColumnChartPage";
import CompanyPage from "./pages/CompanyPage";
import CurrenciesPage from "./pages/CurrenciesPage";
import DropdownPage from "./pages/DropdownPage";
import ErrorPage from "./pages/ErrorPage";
import FaqPage from "./pages/FaqPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FormLayoutPage from "./pages/FormLayoutPage";
import FormValidationPage from "./pages/FormValidationPage";
import FormPage from "./pages/FormPage";
import GalleryPage from "./pages/GalleryPage";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import InvoiceAddPage from "./pages/InvoiceAddPage";
import InvoiceEditPage from "./pages/InvoiceEditPage";
import InvoiceListPage from "./pages/InvoiceListPage";
import InvoicePreviewPage from "./pages/InvoicePreviewPage";
import KanbanPage from "./pages/KanbanPage";
import LanguagePage from "./pages/LanguagePage";
import LineChartPage from "./pages/LineChartPage";
import ListPage from "./pages/ListPage";
import MarketplaceDetailsPage from "./pages/MarketplaceDetailsPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotificationAlertPage from "./pages/NotificationAlertPage";
import NotificationPage from "./pages/NotificationPage";
import PaginationPage from "./pages/PaginationPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import PieChartPage from "./pages/PieChartPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";
import ProgressPage from "./pages/ProgressPage";
import RadioPage from "./pages/RadioPage";
import RoleAccessPage from "./pages/RoleAccessPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StarRatingPage from "./pages/StarRatingPage";
import StarredPage from "./pages/StarredPage";
import SwitchPage from "./pages/SwitchPage";
import TableBasicPage from "./pages/TableBasicPage";
import TableDataPage from "./pages/TableDataPage";
import TabsPage from "./pages/TabsPage";
import TagsPage from "./pages/TagsPage";
import TermsConditionPage from "./pages/TermsConditionPage";
import TextGeneratorPage from "./pages/TextGeneratorPage";
import ThemePage from "./pages/ThemePage";
import TooltipPage from "./pages/TooltipPage";
import TypographyPage from "./pages/TypographyPage";
import UsersGridPage from "./pages/UsersGridPage";
import UsersListPage from "./pages/UsersListPage";
import ViewDetailsPage from "./pages/ViewDetailsPage";
import VideoGeneratorPage from "./pages/VideoGeneratorPage";
import VideosPage from "./pages/VideosPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import VoiceGeneratorPage from "./pages/VoiceGeneratorPage";
import WalletPage from "./pages/WalletPage";
import WidgetsPage from "./pages/WidgetsPage";
import WizardPage from "./pages/WizardPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import TextGeneratorNewPage from "./pages/TextGeneratorNewPage";
import HomePageEight from "./pages/HomePageEight";
import HomePageNine from "./pages/HomePageNine";
import HomePageTen from "./pages/HomePageTen";
import HomePageEleven from "./pages/HomePageEleven";
import GalleryGridPage from "./pages/GalleryGridPage";
import GalleryMasonryPage from "./pages/GalleryMasonryPage";
import GalleryHoverPage from "./pages/GalleryHoverPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import AddBlogPage from "./pages/AddBlogPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MaintenancePage from "./pages/MaintenancePage";
import BlankPagePage from "./pages/BlankPagePage";
import UserDetails from "./components/MoreInfo";
import PredictionManagement from "./components/InvoiceAddLayer";
import RechargeManagement from "./components/InvoiceEditLayer";
import NewWithdraw from "./components/child/NewWithdraw";
import SubmittedWithdraw from "./components/child/SubmittedWithdraw";
import SuccessWithdraw from "./components/SuccessWithdraw";
import FailedWithdraw from "./components/FailedWithdraw";
import UserReport from "./components/UserReport";
import LevelDetails from "./components/LevelPage";
import AdminImageManager from "./components/child/ActivityPageEdit";
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicRoute";
import WeeklyProfit from "./pages/WeeklyProfit";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route path="/sign-in" element={<PublicOnlyRoute element={<SignInPage />} />} />
        <Route path="/forgot-password" element={<PublicOnlyRoute element={<ForgotPasswordPage />} />} />
        <Route path="/coming-soon" element={<PublicOnlyRoute element={<ComingSoonPage />} />} />
        <Route path="/maintenance" element={<PublicOnlyRoute element={<MaintenancePage />} />} />
        <Route path="/access-denied" element={<PublicOnlyRoute element={<AccessDeniedPage />} />} />
        <Route path="/" element={<PrivateRoute element={<HomePageOne />} />} />
        <Route path="/index-2" element={<PrivateRoute element={<HomePageTwo />} />} />
        <Route path="/index-3" element={<PrivateRoute element={<HomePageThree />} />} />
        <Route path="/index-4" element={<PrivateRoute element={<HomePageFour />} />} />
        <Route path="/index-5" element={<PrivateRoute element={<HomePageFive />} />} />
        <Route path="/index-6" element={<PrivateRoute element={<HomePageSix />} />} />
        <Route path="/index-7" element={<PrivateRoute element={<HomePageSeven />} />} />
        <Route path="/index-8" element={<PrivateRoute element={<HomePageEight />} />} />
        <Route path="/index-9" element={<PrivateRoute element={<HomePageNine />} />} />
        <Route path="/index-10" element={<PrivateRoute element={<HomePageTen />} />} />
        <Route path="/index-11" element={<PrivateRoute element={<HomePageEleven />} />} />

        {/* SL */}
        <Route path="/add-user" element={<PrivateRoute element={<AddUserPage />} />} />
        <Route path="/alert" element={<PrivateRoute element={<AlertPage />} />} />
        <Route path="/assign-role" element={<PrivateRoute element={<AssignRolePage />} />} />
        <Route path="/avatar" element={<PrivateRoute element={<AvatarPage />} />} />
        <Route path="/badges" element={<PrivateRoute element={<BadgesPage />} />} />
        <Route path="/button" element={<PrivateRoute element={<ButtonPage />} />} />
        <Route path="/calendar-main" element={<PrivateRoute element={<CalendarMainPage />} />} />
        <Route path="/calendar" element={<PrivateRoute element={<CalendarMainPage />} />} />
        <Route path="/card" element={<PrivateRoute element={<CardPage />} />} />
        <Route path="/carousel" element={<PrivateRoute element={<CarouselPage />} />} />
        <Route path="/chat-empty" element={<PrivateRoute element={<ChatEmptyPage />} />} />
        <Route path="/chat-message" element={<PrivateRoute element={<ChatMessagePage />} />} />
        <Route path="/chat-profile" element={<PrivateRoute element={<ChatProfilePage />} />} />
        <Route path="/code-generator" element={<PrivateRoute element={<CodeGeneratorPage />} />} />
        <Route path="/code-generator-new" element={<PrivateRoute element={<CodeGeneratorNewPage />} />} />
        <Route path="/colors" element={<PrivateRoute element={<ColorsPage />} />} />
        <Route path="/column-chart" element={<PrivateRoute element={<ColumnChartPage />} />} />
        <Route path="/company" element={<PrivateRoute element={<CompanyPage />} />} />
        <Route path="/currencies" element={<PrivateRoute element={<CurrenciesPage />} />} />
        <Route path="/dropdown" element={<PrivateRoute element={<DropdownPage />} />} />
        <Route path="/email" element={<PrivateRoute element={<EmailPage />} />} />
        <Route path="/faq" element={<PrivateRoute element={<FaqPage />} />} />
        <Route path="/form-layout" element={<PrivateRoute element={<FormLayoutPage />} />} />
        <Route path="/form-validation" element={<PrivateRoute element={<FormValidationPage />} />} />
        <Route path="/form" element={<PrivateRoute element={<FormPage />} />} />
        <Route path="/gallery" element={<PrivateRoute element={<GalleryPage />} />} />
        <Route path="/gallery-grid" element={<PrivateRoute element={<GalleryGridPage />} />} />
        <Route path="/gallery-masonry" element={<PrivateRoute element={<GalleryMasonryPage />} />} />
        <Route path="/gallery-hover" element={<PrivateRoute element={<GalleryHoverPage />} />} />
        <Route path="/blog" element={<PrivateRoute element={<BlogPage />} />} />
        <Route path="/blog-details" element={<PrivateRoute element={<BlogDetailsPage />} />} />
        <Route path="/add-blog" element={<PrivateRoute element={<AddBlogPage />} />} />
        <Route path="/testimonials" element={<PrivateRoute element={<TestimonialsPage />} />} />
        <Route path="/image-generator" element={<PrivateRoute element={<ImageGeneratorPage />} />} />
        <Route path="/image-upload" element={<PrivateRoute element={<ImageUploadPage />} />} />
        <Route path="/invoice-add" element={<PrivateRoute element={<PredictionManagement />} />} />
        <Route path="/invoice-edit" element={<PrivateRoute element={<RechargeManagement />} />} />
        <Route path="/new-withdraw" element={<PrivateRoute element={<NewWithdraw />} />} />
        <Route path="/submitted-withdraw" element={<PrivateRoute element={<SubmittedWithdraw />} />} />
        <Route path="/success-withdraw" element={<PrivateRoute element={<SuccessWithdraw />} />} />
        <Route path="/failed-withdraw" element={<PrivateRoute element={<FailedWithdraw />} />} />
        <Route path="/user-report" element={<PrivateRoute element={<UserReport />} />} />
        <Route path="/level-details/:level" element={<PrivateRoute element={<LevelDetails />} />} />
        <Route path="/activity-page-edit" element={<PrivateRoute element={<AdminImageManager />} />} />
        <Route path="/invoice-list" element={<PrivateRoute element={<InvoiceListPage />} />} />
        <Route path="/weekly-profit" element={<PrivateRoute element={<WeeklyProfit />} />} />
        <Route path="/invoice-preview" element={<PrivateRoute element={<InvoicePreviewPage />} />} />
        <Route path="/kanban" element={<PrivateRoute element={<KanbanPage />} />} />
        <Route path="/language" element={<PrivateRoute element={<LanguagePage />} />} />
        <Route path="/line-chart" element={<PrivateRoute element={<LineChartPage />} />} />
        <Route path="/list" element={<PrivateRoute element={<ListPage />} />} />
        <Route path="/marketplace-details" element={<PrivateRoute element={<MarketplaceDetailsPage />} />} />
        <Route path="/marketplace" element={<PrivateRoute element={<MarketplacePage />} />} />
        <Route path="/notification-alert" element={<PrivateRoute element={<NotificationAlertPage />} />} />
        <Route path="/notification" element={<PrivateRoute element={<NotificationPage />} />} />
        <Route path="/pagination" element={<PrivateRoute element={<PaginationPage />} />} />
        <Route path="/payment-gateway" element={<PrivateRoute element={<PaymentGatewayPage />} />} />
        <Route path="/pie-chart" element={<PrivateRoute element={<PieChartPage />} />} />
        <Route path="/portfolio" element={<PrivateRoute element={<PortfolioPage />} />} />
        <Route path="/pricing" element={<PrivateRoute element={<PricingPage />} />} />
        <Route path="/progress" element={<PrivateRoute element={<ProgressPage />} />} />
        <Route path="/radio" element={<PrivateRoute element={<RadioPage />} />} />
        <Route path="/role-access" element={<PrivateRoute element={<RoleAccessPage />} />} />
        <Route path="/star-rating" element={<PrivateRoute element={<StarRatingPage />} />} />
        <Route path="/starred" element={<PrivateRoute element={<StarredPage />} />} />
        <Route path="/switch" element={<PrivateRoute element={<SwitchPage />} />} />
        <Route path="/table-basic" element={<PrivateRoute element={<TableBasicPage />} />} />
        <Route path="/table-data" element={<PrivateRoute element={<TableDataPage />} />} />
        <Route path="/tabs" element={<PrivateRoute element={<TabsPage />} />} />
        <Route path="/tags" element={<PrivateRoute element={<TagsPage />} />} />
        <Route path="/terms-condition" element={<PrivateRoute element={<TermsConditionPage />} />} />
        <Route path="/text-generator-new" element={<PrivateRoute element={<TextGeneratorNewPage />} />} />
        <Route path="/text-generator" element={<PrivateRoute element={<TextGeneratorPage />} />} />
        <Route path="/theme" element={<PrivateRoute element={<ThemePage />} />} />
        <Route path="/tooltip" element={<PrivateRoute element={<TooltipPage />} />} />
        <Route path="/typography" element={<PrivateRoute element={<TypographyPage />} />} />
        <Route path="/users-grid" element={<PrivateRoute element={<UsersGridPage />} />} />
        <Route path="/users-list" element={<PrivateRoute element={<UsersListPage />} />} />
        <Route path="/view-details" element={<PrivateRoute element={<ViewDetailsPage />} />} />
        <Route path="/video-generator" element={<PrivateRoute element={<VideoGeneratorPage />} />} />
        <Route path="/videos" element={<PrivateRoute element={<VideosPage />} />} />
        <Route path="/view-profile" element={<PrivateRoute element={<ViewProfilePage />} />} />
        <Route path="/voice-generator" element={<PrivateRoute element={<VoiceGeneratorPage />} />} />
        <Route path="/wallet" element={<PrivateRoute element={<WalletPage />} />} />
        <Route path="/widgets" element={<PrivateRoute element={<WidgetsPage />} />} />
        <Route path="/wizard" element={<PrivateRoute element={<WizardPage />} />} />
        <Route path="/user/:userId" element={<PrivateRoute element={<UserDetails />} />} />
        <Route exact path='/blank-page' element={<BlankPagePage />} />
        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
