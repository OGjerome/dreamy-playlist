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
  Clock,
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

// Les plateformes ont été mises à jour pour forcer la déconnexion de tout ce qui n'est pas Spotify
const platforms = [
  {
    id: "spotify",
    name: "Spotify",
    description:
      "Connectez votre compte Spotify pour importer et exporter vos playlists",
    icon: "/spotify.png",
    color: "bg-green-500",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    isConnected: true, // Géré plus tard dynamiquement (via NextAuth par ex.)
    lastSync: "Il y a 2 heures",
    playlistsExported: 8,
    features: ["Recherche de titres", "Export direct", "Partage public"],
  },
  {
    id: "deezer",
    name: "Deezer",
    description: "Bientôt disponible pour une expérience multi-plateforme",
    icon: "/deezer.jpg",
    color: "bg-purple-500",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    isConnected: false,
    lastSync: null,
    playlistsExported: 0,
    features: ["Export de playlists", "Découverte musicale", "Qualité Hi-Fi"],
  },
  {
    id: "youtube",
    name: "YouTube Music",
    description: "Bientôt disponible pour intégrer vos vidéos",
    icon: "/youtube-music.png",
    color: "bg-red-500",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    isConnected: false,
    lastSync: null,
    playlistsExported: 0,
    features: ["Export de playlists", "Intégration Google", "Vidéos musicales"],
  },
  {
    id: "apple",
    name: "Apple Music",
    description: "Bientôt disponible pour votre écosystème Apple",
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
    description: "Bientôt disponible pour la musique indépendante",
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
    // Ici, le futur développeur fera une redirection vers la route NextAuth (ex: signIn('spotify'))
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
          <h1 className="text-3xl font-bold text-white">Services connectés</h1>
          <p className="text-gray-400 mt-2">
            Gérez vos connexions aux plateformes de streaming
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Platform Cards */}
          <div className="lg:col-span-2 space-y-6">
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className={`bg-gray-900/50 backdrop-blur-sm transition-all duration-300 ${
                  platform.id === "spotify"
                    ? platform.isConnected
                      ? `${platform.borderColor} hover:bg-gray-900/70`
                      : "border-green-500/30 hover:bg-gray-900/70"
                    : "border-gray-800 opacity-60" // Effet grisé pour les plateformes inactives
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg overflow-hidden ${platform.id !== "spotify" && "grayscale"}`}
                      >
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
                          {platform.id === "spotify" &&
                            platform.isConnected && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Connecté
                              </Badge>
                            )}
                          {platform.id === "spotify" &&
                            !platform.isConnected && (
                              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                                <XCircle className="w-3 h-3 mr-1" />
                                Non connecté
                              </Badge>
                            )}
                          {platform.id !== "spotify" && (
                            <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/30">
                              <Clock className="w-3 h-3 mr-1" />
                              Bientôt
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {platform.description}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Engrenage Paramètres uniquement si c'est Spotify et connecté */}
                    <div className="flex items-center gap-2">
                      {platform.id === "spotify" && platform.isConnected && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSync(platform.id)}
                            className="border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:text-white bg-transparent"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
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
                                  Configurez votre intégration avec{" "}
                                  {platform.name}
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
                              </div>
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Affichage pour Spotify Connecté */}
                    {platform.id === "spotify" && platform.isConnected && (
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

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500/30 text-gray-400 hover:bg-gray-500/20 hover:text-white bg-transparent"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ouvrir Spotify
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
                    )}

                    {/* Affichage pour Spotify Non connecté */}
                    {platform.id === "spotify" && !platform.isConnected && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">
                            Connectez votre compte pour commencer à gérer vos
                            playlists
                          </span>
                        </div>
                        <Button
                          onClick={() => handleConnect(platform.id)}
                          className="bg-green-500 hover:bg-green-600 text-white border-0 mt-2"
                        >
                          <Link2 className="w-4 h-4 mr-2" />
                          Connecter Spotify
                        </Button>
                      </div>
                    )}

                    {/* Affichage pour les autres plateformes (Bientôt) */}
                    {platform.id !== "spotify" && (
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-500 text-sm">
                            Fonctionnalités à venir :
                          </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {platform.features.map((feature) => (
                              <Badge
                                key={feature}
                                className="text-gray-500 bg-transparent border border-gray-700/50"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          disabled
                          className="bg-gray-800 text-gray-500 border-0 mt-2 cursor-not-allowed"
                        >
                          Indisponible pour le moment
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
            {/* Global Settings : Allégé pour le single-platform */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Paramètres globaux</CardTitle>
                <CardDescription className="text-gray-400">
                  Préférences de compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <span className="text-gray-400">Compte actif</span>
                    <span className="text-white font-semibold flex items-center gap-2">
                      Spotify
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total exports</span>
                    <span className="text-white font-semibold">
                      {platforms.reduce(
                        (acc, p) => acc + p.playlistsExported,
                        0,
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions - Nettoyé des autres plateformes */}
            <Card className="bg-gray-900/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Action rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => handleConnect("spotify")}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
