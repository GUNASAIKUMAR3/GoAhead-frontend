import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { Link } from "react-router-dom";
  
  export function SettingsBreadcrumb() {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }