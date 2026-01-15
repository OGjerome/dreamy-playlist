"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Link2,
  RefreshCw,
  Settings,
  Unlink,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const platforms = [
  {
    id: "spotify",
    name: "Spotify",
    description: "Connectez votre compte Spotify pour exporter vos playlists",
    icon: "/spotify.png",
    color: "bg-green-500",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    isConnected: true,
    lastSync: "Il y a 2 heures",
    playlistsExported: 8,
    features: [
      "Export de playlists",
      "Synchronisation automatique",
      "Partage public",
    ],
  },
  {
    id: "deezer",
    name: "Deezer",
    description:
      "Synchronisez avec Deezer pour une expérience multi-plateforme",
    icon: "/deezer.jpg",
    color: "bg-purple-500",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    isConnected: true,
    lastSync: "Il y a 1 jour",
    playlistsExported: 5,
    features: ["Export de playlists", "Découverte musicale", "Qualité Hi-Fi"],
  },
  {
    id: "youtube",
    name: "YouTube Music",
    description: "Intégrez YouTube Music à votre workflow musical",
    icon: "/youtube-music.png",
    color: "bg-red-500",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    isConnected: true,
    lastSync: "Il y a 3 heures",
    playlistsExported: 3,
    features: ["Export de playlists", "Intégration Google", "Vidéos musicales"],
  },
  {
    id: "apple",
    name: "Apple Music",
    description: "Intégrez Apple Music à votre workflow musical",
    icon: "/apple-music.png",
    color: "bg-gray-600",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-300",
    isConnected: false,
    lastSync: null,
    playlistsExported: 0,
    features: ["Export de playlists", "Intégration iOS", "Audio spatial"],
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    description: "Connectez SoundCloud pour découvrir de nouveaux artistes",
    icon: "/soundcloud.webp",
    color: "bg-orange-600",
    borderColor: "border-orange-600/30",
    textColor: "text-orange-400",
    isConnected: false,
    lastSync: null,
    playlistsExported: 0,
    features: ["Export de playlists", "Artistes indépendants", "Podcasts"],
  },
];

export default function Platforms() {
  const [autoSync, setAutoSync] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleConnect = (platformId: string) => {
    console.log(`Connecting to ${platformId}`);
  };

  const handleDisconnect = (platformId: string) => {
    console.log(`Disconnecting from ${platformId}`);
  };

  const handleSync = (platformId: string) => {
    console.log(`Syncing ${platformId}`);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Effets de lumière de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">
            Plateformes connectées
          </h1>
          <p className="text-gray-400 mt-2">
            Gérez vos connexions aux services de streaming musical
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Platform Cards */}
          <div className="lg:col-span-2 space-y-6">
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className={`bg-gray-900/50 backdrop-blur-sm transition-all duration-300 ${
                  platform.isConnected
                    ? `${platform.borderColor} hover:bg-gray-900/70`
                    : "border-gray-700/30 hover:bg-gray-900/70"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                        <Image
                          src={platform.icon}
                          alt={platform.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          {platform.name}
                          {platform.isConnected ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Connecté
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                              <XCircle className="w-3 h-3 mr-1" />
                              Non connecté
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {platform.description}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {platform.isConnected && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSync(platform.id)}
                          className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-violet-500/30">
                          <DialogHeader>
                            <DialogTitle className="text-white">
                              Paramètres {platform.name}
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Configurez votre intégration avec {platform.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label
                                htmlFor={`auto-sync-${platform.id}`}
                                className="text-gray-300"
                              >
                                Synchronisation automatique
                              </Label>
                              <Switch
                                id={`auto-sync-${platform.id}`}
                                checked={autoSync}
                                onCheckedChange={setAutoSync}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label
                                htmlFor={`notifications-${platform.id}`}
                                className="text-gray-300"
                              >
                                Notifications
                              </Label>
                              <Switch
                                id={`notifications-${platform.id}`}
                                checked={notifications}
                                onCheckedChange={setNotifications}
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platform.isConnected ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">
                              Dernière sync:
                            </span>
                            <p className="text-white">{platform.lastSync}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Playlists exportées:
                            </span>
                            <p className="text-white">
                              {platform.playlistsExported}
                            </p>
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-400 text-sm">
                            Fonctionnalités disponibles:
                          </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {platform.features.map((feature) => (
                              <Badge
                                key={feature}
                                className={`${platform.textColor} bg-transparent border ${platform.borderColor}`}
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSync(platform.id)}
                            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Synchroniser maintenant
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500/30 text-gray-400 hover:bg-gray-500/20 hover:text-white bg-transparent"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ouvrir {platform.name}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDisconnect(platform.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-transparent"
                          >
                            <Unlink className="w-4 h-4 mr-2" />
                            Déconnecter
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm">
                            Connectez votre compte pour commencer à exporter vos
                            playlists
                          </span>
                        </div>

                        <div>
                          <span className="text-gray-400 text-sm">
                            Fonctionnalités disponibles après connexion:
                          </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {platform.features.map((feature) => (
                              <Badge
                                key={feature}
                                className="text-gray-500 bg-transparent border border-gray-500/30"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleConnect(platform.id)}
                          className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
                        >
                          <Link2 className="w-4 h-4 mr-2" />
                          Connecter {platform.name}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column - Settings & Stats */}
          <div className="space-y-6">
            {/* Global Settings */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Paramètres globaux</CardTitle>
                <CardDescription className="text-gray-400">
                  Configuration générale des plateformes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync-global" className="text-gray-300">
                    Synchronisation automatique
                  </Label>
                  <Switch
                    id="auto-sync-global"
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notifications-global"
                    className="text-gray-300"
                  >
                    Notifications d&apos;export
                  </Label>
                  <Switch
                    id="notifications-global"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Synchroniser toutes les plateformes
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Plateformes connectées
                    </span>
                    <span className="text-white font-semibold">
                      {platforms.filter((p) => p.isConnected).length}/
                      {platforms.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total exports</span>
                    <span className="text-white font-semibold">
                      {platforms.reduce(
                        (acc, p) => acc + p.playlistsExported,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Dernière synchronisation
                    </span>
                    <span className="text-white font-semibold">Il y a 2h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-green-500/30 text-green-400 hover:bg-green-500/20 hover:text-white bg-transparent"
                >
                  <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                    <Image
                      src="/spotify.png"
                      alt="Spotify"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Connecter Spotify
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:text-white bg-transparent"
                >
                  <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                    <Image
                      src="/deezer.jpg"
                      alt="Deezer"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Connecter Deezer
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-white bg-transparent"
                >
                  <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                    <Image
                      src="/youtube-music.png"
                      alt="YouTube Music"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Connecter YouTube Music
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-500/30 text-gray-400 hover:bg-gray-500/20 hover:text-white bg-transparent"
                >
                  <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                    <Image
                      src="/apple-music.png"
                      alt="Apple Music"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Connecter Apple Music
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-600/30 text-orange-400 hover:bg-orange-600/20 hover:text-white bg-transparent"
                >
                  <div className="w-4 h-4 mr-2 rounded-full overflow-hidden">
                    <Image
                      src="/soundcloud.webp"
                      alt="SoundCloud"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Connecter SoundCloud
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
