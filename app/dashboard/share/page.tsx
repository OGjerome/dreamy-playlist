"use client";

import {
  ArrowLeft,
  Copy,
  Facebook,
  Instagram,
  Link2,
  QrCode,
  Twitter,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SharePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white mb-4"
        >
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">Partage</h1>
        <p className="text-gray-400 mt-2">
          Partagez vos playlists avec vos amis et sur les réseaux sociaux
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Partage rapide</CardTitle>
              <CardDescription className="text-gray-400">
                Générez un lien de partage pour vos playlists
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Lien de partage</label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value="https://dreamyplaylist.com/share/summer-vibes-2025"
                    className="bg-gray-800/50 border-violet-500/30 text-white"
                  />
                  <Button
                    variant="outline"
                    className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Lien court
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Réseaux sociaux</CardTitle>
              <CardDescription className="text-gray-400">
                Partagez directement sur vos plateformes préférées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white bg-transparent"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Partager sur Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:text-white bg-transparent"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Partager sur Twitter
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:text-white bg-transparent"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Partager sur Instagram
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Playlists partagées</CardTitle>
              <CardDescription className="text-gray-400">
                Vos playlists actuellement partagées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">
                      Summer Vibes 2025
                    </h4>
                    <p className="text-sm text-gray-400">
                      Partagée il y a 2 jours • 15 vues
                    </p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Publique
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Workout Energy</h4>
                    <p className="text-sm text-gray-400">
                      Partagée il y a 1 semaine • 8 vues
                    </p>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Privée
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Statistiques de partage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">28</div>
                  <div className="text-sm text-gray-400">Total partages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-sm text-gray-400">Vues totales</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
