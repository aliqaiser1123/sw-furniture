"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SEOFields } from "@/components/admin/SEOFields";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Add Product" 
          breadcrumbs={[
            { label: "Products", href: "/admin/products" },
            { label: "Add", href: "/admin/products/create" }
          ]}
        />
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/products"><ArrowLeft className="h-4 w-4 mr-2" /> Cancel</Link>
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" /> Save Product
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g. Royal Sheesham King Bed" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="SW-BED-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="royal-sheesham-king-bed" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea id="shortDescription" placeholder="A brief summary of the product..." className="h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea id="description" placeholder="Markdown or detailed product information..." className="h-40" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload maxImages={8} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attributes & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input id="material" defaultValue="Solid Sheesham Wood" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finish">Finish</Label>
                  <Select defaultValue="walnut">
                    <SelectTrigger><SelectValue placeholder="Select finish" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walnut">Walnut</SelectItem>
                      <SelectItem value="teak">Teak</SelectItem>
                      <SelectItem value="natural">Natural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <SEOFields />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="DRAFT">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beds">Beds</SelectItem>
                    <SelectItem value="sofas">Sofas</SelectItem>
                    <SelectItem value="dining">Dining</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Collection</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select collection" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="royal">Royal Collection</SelectItem>
                    <SelectItem value="minimal">Minimalist Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Regular Price (Rs.)</Label>
                <Input id="price" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price (Rs.)</Label>
                <Input id="salePrice" type="number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" defaultValue="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowStock">Low Stock Alert</Label>
                  <Input id="lowStock" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
