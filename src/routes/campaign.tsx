import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CampaignProvider } from "@/state/campaign";
import DeviceFrame from "@/components/DeviceFrame";

export const Route = createFileRoute("/campaign")({
  component: CampaignLayout,
});

function CampaignLayout() {
  return (
    <CampaignProvider>
      <DeviceFrame>
        <Outlet />
      </DeviceFrame>
    </CampaignProvider>
  );
}
