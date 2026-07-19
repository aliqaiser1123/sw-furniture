import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export const metadata = { title: "Analytics Settings | Admin" };

async function updateAnalyticsSettings(formData: FormData) {
  "use server";
  const googleAnalyticsId = formData.get("ga4Id") as string;
  const gtmId = formData.get("gtmId") as string;
  const metaPixelId = formData.get("metaPixelId") as string;
  const clarityId = formData.get("clarityId") as string;
  
  await db.settings.upsert({
    where: { id: "singleton" },
    update: { googleAnalyticsId, gtmId, metaPixelId, clarityId },
    create: { id: "singleton", googleAnalyticsId, gtmId, metaPixelId, clarityId },
  });
  
  revalidatePath("/admin/settings/analytics");
  revalidatePath("/", "layout");
}

export default async function AnalyticsSettingsPage() {
  const settings = await db.settings.findUnique({ where: { id: "singleton" } });

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Analytics Integration"
        description="Configure third-party analytics and tracking providers."
      />

      <form action={updateAnalyticsSettings} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Google Analytics (GA4) & Tag Manager</CardTitle>
            <CardDescription>Track user behavior, conversions, and site traffic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ga4Id">Google Analytics 4 Measurement ID</Label>
              <Input
                id="ga4Id"
                name="ga4Id"
                placeholder="G-XXXXXXXXXX"
                defaultValue={settings?.googleAnalyticsId || ""}
              />
              <p className="text-xs text-muted-foreground">Found in GA4 Data Streams settings.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gtmId">Google Tag Manager Container ID</Label>
              <Input
                id="gtmId"
                name="gtmId"
                placeholder="GTM-XXXXXXX"
                defaultValue={settings?.gtmId || ""}
              />
              <p className="text-xs text-muted-foreground">Optional if you only use GA4 directly.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meta (Facebook) Pixel</CardTitle>
            <CardDescription>Track ad conversions and build remarketing audiences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="metaPixelId">Meta Pixel ID</Label>
              <Input
                id="metaPixelId"
                name="metaPixelId"
                placeholder="XXXXXXXXXXXXXXXX"
                defaultValue={settings?.metaPixelId || ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Microsoft Clarity</CardTitle>
            <CardDescription>Visualize user interactions with heatmaps and session recordings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="clarityId">Clarity Project ID</Label>
              <Input
                id="clarityId"
                name="clarityId"
                placeholder="XXXXXXXXXX"
                defaultValue={settings?.clarityId || ""}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Configurations</Button>
        </div>
      </form>
    </div>
  );
}
