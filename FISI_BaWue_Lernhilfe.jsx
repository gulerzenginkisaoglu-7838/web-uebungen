import { useState } from "react";

// ============================================================
// DATA
// ============================================================

const pruefungsStruktur = [
  {
    id: "ap1",
    titel: "AP1 – Abschlussprüfung Teil 1",
    gewicht: "20%",
    farbe: "#00b4d8",
    icon: "📋",
    dauer: "90 Minuten",
    format: "Schriftlich, freie Antworten (KEIN Multiple Choice!)",
    bawuHinweis: "Bundeseinheitlich – gleich wie im Rest von Deutschland",
    bereiche: [
      { name: "Einrichten eines IT-gestützten Arbeitsplatzes", anteil: "100%", note: "Alles in einer Prüfung" }
    ],
    themen: [
      "Hardware (CPU, RAM, Speicher, Schnittstellen)",
      "Betriebssysteme & Virtualisierung",
      "Netzwerkgrundlagen (IP, DNS, DHCP, TCP/UDP)",
      "IT-Sicherheit (Grundlagen)",
      "Datenschutz (DSGVO Grundlagen)",
      "Kundenberatung & Arbeitsplatz einrichten",
      "Kaufmännische Grundlagen (Kosten, Angebote vergleichen)",
      "Umweltschutz & Nachhaltigkeit in der IT",
      "⚠️ Seit 2025 GESTRICHEN: SQL, RAID, Struktogramme, PAP"
    ]
  },
  {
    id: "ap2_fach1",
    titel: "AP2 – Konzeption & Administration von IT-Systemen",
    gewicht: "10%",
    farbe: "#7b2d8b",
    icon: "🖥️",
    dauer: "90 Minuten",
    format: "Schriftlich",
    bawuHinweis: "IHK-Prüfung (bundesweit einheitlich für FISI)",
    bereiche: [],
    themen: [
      "Server-Administration (Windows Server, Linux)",
      "Virtualisierung (VMware, Hyper-V, VirtualBox)",
      "Cloud-Dienste (IaaS, PaaS, SaaS)",
      "Backup & Recovery Konzepte",
      "RAID-Systeme (0, 1, 5, 6, 10)",
      "Active Directory & Benutzerverwaltung",
      "Monitoring & Troubleshooting",
      "IT-Sicherheitskonzepte (Firewall, VPN, IDS/IPS)",
      "ITIL-Grundlagen (Incident, Problem, Change Management)",
      "Lizenzmodelle"
    ]
  },
  {
    id: "ap2_fach2",
    titel: "AP2 – Analyse & Entwicklung von Netzwerken",
    gewicht: "10%",
    farbe: "#0077b6",
    icon: "🌐",
    dauer: "90 Minuten",
    format: "Schriftlich",
    bawuHinweis: "IHK-Prüfung (bundesweit einheitlich für FISI)",
    bereiche: [],
    themen: [
      "OSI-Modell (alle 7 Schichten auswendig!)",
      "TCP/IP-Modell",
      "IP-Adressen & Subnetting (IPv4 & IPv6)",
      "VLSM und CIDR",
      "Routing (statisch & dynamisch: OSPF, BGP, RIP)",
      "Switching (VLANs, Spanning Tree, Trunking)",
      "WLAN Standards (802.11 a/b/g/n/ac/ax)",
      "Netzwerkprotokolle (DNS, DHCP, HTTP/S, FTP, SSH, SMTP)",
      "Netzwerksicherheit (Firewall-Regeln, DMZ, VPN)",
      "Netzwerkdokumentation & Topologien"
    ]
  },
  {
    id: "ap2_wiso",
    titel: "AP2 – WiSo (Wirtschafts- und Sozialkunde)",
    gewicht: "10%",
    farbe: "#2d6a4f",
    icon: "💼",
    dauer: "60 Minuten",
    format: "Schriftlich",
    bawuHinweis: "🚨 BAWÜ BESONDERHEIT: Berufsschule schreibt ZUSÄTZLICH Deutsch + Gemeinschaftskunde! IHK-WiSo ist trotzdem dabei.",
    bereiche: [],
    themen: [
      "Berufsausbildung & Ausbildungsvertrag",
      "Arbeitsrecht (Kündigung, Tarifvertrag, Betriebsrat)",
      "Sozialversicherung (KV, RV, UV, AV, PV)",
      "Jugendarbeitsschutz",
      "Wirtschaftssysteme (Marktwirtschaft)",
      "Unternehmensgründung & -formen (GmbH, AG, GbR...)",
      "Steuern (Grundlagen: USt, ESt)",
      "Verbraucherschutz",
      "Umweltschutz & Nachhaltigkeit",
      "Europäische Union"
    ]
  },
  {
    id: "ap2_projekt",
    titel: "AP2 – Betriebliches Projekt + Präsentation",
    gewicht: "50%",
    farbe: "#e63946",
    icon: "🚀",
    dauer: "70 Stunden Projekt + 30 Min Präsentation & Fachgespräch",
    format: "Praktisch + Mündlich",
    bawuHinweis: "WICHTIGSTER TEIL! 50% der Gesamtnote. Reales Projekt im Betrieb.",
    bereiche: [],
    themen: [
      "Reales IT-Projekt im Ausbildungsbetrieb planen & umsetzen",
      "Projektdokumentation schreiben (15-20 Seiten)",
      "Projektantrag bei IHK einreichen (vorher genehmigen lassen!)",
      "Präsentation vor Prüfungsausschuss (ca. 15 Min)",
      "Fachgespräch: Fragen zum Projekt & Fachthemen (ca. 15 Min)",
      "Themen: Netzwerk einrichten, Server aufsetzen, Migration...",
      "Wirtschaftlichkeitsanalyse im Projekt pflichthalber",
      "Zeitplan & Meilensteine dokumentieren"
    ]
  }
];

const fachbegriffe = [
  // NETZWERK
  { begriff: "OSI-Modell", kategorie: "Netzwerk", erklaerung: "7-Schichten-Modell für Netzwerkkommunikation. Schichten: Physical, Data Link, Network, Transport, Session, Presentation, Application. Merkhilfe: 'Alle Deutschen Nehmen Tiere Sehr Persönlich Auf'", wichtig: 5 },
  { begriff: "IP-Adresse", kategorie: "Netzwerk", erklaerung: "Eindeutige Adresse eines Geräts im Netzwerk. IPv4: 32 Bit (z.B. 192.168.1.1), IPv6: 128 Bit. Private Bereiche: 10.x.x.x, 172.16-31.x.x, 192.168.x.x", wichtig: 5 },
  { begriff: "Subnetting", kategorie: "Netzwerk", erklaerung: "Aufteilung eines IP-Netzes in kleinere Teilnetze mithilfe der Subnetzmaske. /24 = 255.255.255.0 = 256 Adressen (254 nutzbar). Für Prüfung: CIDR-Notation beherrschen!", wichtig: 5 },
  { begriff: "DHCP", kategorie: "Netzwerk", erklaerung: "Dynamic Host Configuration Protocol – vergibt automatisch IP-Adressen, Subnetzmaske, Gateway und DNS an Geräte im Netzwerk. Protokollport: 67 (Server), 68 (Client)", wichtig: 5 },
  { begriff: "DNS", kategorie: "Netzwerk", erklaerung: "Domain Name System – übersetzt Domainnamen (z.B. google.com) in IP-Adressen. Port 53. Wichtige Records: A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias)", wichtig: 5 },
  { begriff: "TCP vs UDP", kategorie: "Netzwerk", erklaerung: "TCP: verbindungsorientiert, zuverlässig, langsamer (HTTP, SSH, FTP). UDP: verbindungslos, schnell, keine Garantie (DNS, Streaming, VoIP). TCP = 3-Way-Handshake (SYN, SYN-ACK, ACK)", wichtig: 5 },
  { begriff: "VLAN", kategorie: "Netzwerk", erklaerung: "Virtual Local Area Network – logische Trennung von Netzwerken auf einem physischen Switch. Erhöht Sicherheit und Performance. Konfiguration per IEEE 802.1Q (Trunk-Port)", wichtig: 4 },
  { begriff: "Router", kategorie: "Netzwerk", erklaerung: "Verbindet verschiedene Netzwerke (Layer 3). Leitet Pakete anhand von IP-Adressen weiter. Routing-Tabellen: statisch (manuell) oder dynamisch (OSPF, BGP, RIP)", wichtig: 4 },
  { begriff: "Switch", kategorie: "Netzwerk", erklaerung: "Verbindet Geräte im selben Netzwerk (Layer 2). Arbeitet mit MAC-Adressen. Managed Switch = konfigurierbar (VLANs, QoS). Unmanaged = Plug & Play.", wichtig: 4 },
  { begriff: "Firewall", kategorie: "Netzwerk", erklaerung: "Kontrolliert Netzwerkverkehr anhand von Regeln (Ports, IPs, Protokolle). Typen: Paketfilter (einfach), Stateful (verbindungsbasiert), Next-Gen (deep inspection)", wichtig: 5 },
  { begriff: "VPN", kategorie: "Netzwerk", erklaerung: "Virtual Private Network – verschlüsselte Verbindung über das Internet. Typen: Site-to-Site (Standortvernetzung), Remote-Access (Heimarbeiter). Protokolle: IPSec, OpenVPN, WireGuard", wichtig: 4 },
  { begriff: "DMZ", kategorie: "Netzwerk", erklaerung: "Demilitarisierte Zone – Netzwerksegment zwischen Internet und internem Netz. Webserver etc. stehen dort, um das interne Netz zu schützen.", wichtig: 4 },
  { begriff: "Spanning Tree Protocol", kategorie: "Netzwerk", erklaerung: "STP (IEEE 802.1D) verhindert Schleifen in Netzwerken mit redundanten Verbindungen. Root Bridge wird gewählt, redundante Ports werden blockiert.", wichtig: 3 },
  { begriff: "WLAN Standards", kategorie: "Netzwerk", erklaerung: "802.11b (11 Mbit/s, 2.4GHz), 802.11g (54 Mbit/s, 2.4GHz), 802.11n (300+ Mbit/s, 2.4+5GHz), 802.11ac (WiFi 5, 1+ Gbit/s, 5GHz), 802.11ax (WiFi 6, 10 Gbit/s)", wichtig: 4 },
  // SYSTEME
  { begriff: "RAID", kategorie: "Systeme", erklaerung: "Redundant Array of Independent Disks. RAID 0: Striping (Speed, kein Schutz). RAID 1: Mirroring (Sicherheit). RAID 5: Striping+Parität (min. 3 Platten). RAID 6: 2 Fehler toleriert. RAID 10: 1+0 kombiniert.", wichtig: 5 },
  { begriff: "Virtualisierung", kategorie: "Systeme", erklaerung: "Mehrere virtuelle Maschinen (VMs) auf einer physischen Hardware. Hypervisor Typ 1 (bare metal: VMware ESXi, Hyper-V). Typ 2 (auf OS: VirtualBox, VMware Workstation)", wichtig: 5 },
  { begriff: "Cloud Computing", kategorie: "Systeme", erklaerung: "IaaS (Infrastructure as a Service: virtuelle Server), PaaS (Platform: Entwicklungsumgebung), SaaS (Software: Office 365). Public/Private/Hybrid Cloud.", wichtig: 5 },
  { begriff: "Active Directory", kategorie: "Systeme", erklaerung: "Microsoft Verzeichnisdienst für zentrale Benutzer- und Computerverwaltung. Domäne, Organisationseinheiten (OU), Gruppenrichtlinien (GPO), LDAP-basiert.", wichtig: 4 },
  { begriff: "Backup-Strategien", kategorie: "Systeme", erklaerung: "Vollbackup (alles), Differenziell (alles seit letztem Vollbackup), Inkrementell (alles seit letztem Backup jeder Art). 3-2-1 Regel: 3 Kopien, 2 Medien, 1 off-site.", wichtig: 5 },
  { begriff: "ITIL", kategorie: "Systeme", erklaerung: "IT Infrastructure Library – Best-Practice-Framework. Wichtig: Incident Management (Störung beheben), Problem Management (Ursache finden), Change Management (Änderungen kontrolliert einführen), Service Desk.", wichtig: 4 },
  { begriff: "Ticketsystem", kategorie: "Systeme", erklaerung: "System zur Verwaltung von Support-Anfragen (z.B. OTRS, Jira, ServiceNow). SLA = Service Level Agreement (vereinbarte Reaktions-/Lösungszeiten)", wichtig: 3 },
  { begriff: "Monitoring", kategorie: "Systeme", erklaerung: "Überwachung von IT-Systemen (CPU, RAM, Netzwerk, Dienste). Tools: Nagios, Zabbix, PRTG, Grafana. Alerting bei Schwellwertüberschreitung.", wichtig: 3 },
  // SICHERHEIT
  { begriff: "Verschlüsselung", kategorie: "Sicherheit", erklaerung: "Symmetrisch: gleicher Schlüssel (AES, DES) – schnell. Asymmetrisch: Public/Private Key (RSA) – sicher. Hybrid: beides kombiniert (TLS/HTTPS). Hash: MD5, SHA-256 (nicht umkehrbar)", wichtig: 5 },
  { begriff: "PKI", kategorie: "Sicherheit", erklaerung: "Public Key Infrastructure – System zur Verwaltung digitaler Zertifikate. CA (Certificate Authority) stellt Zertifikate aus. SSL/TLS-Zertifikate für HTTPS-Verschlüsselung.", wichtig: 4 },
  { begriff: "DSGVO", kategorie: "Sicherheit", erklaerung: "Datenschutz-Grundverordnung (EU). Grundsätze: Zweckbindung, Datensparsamkeit, Transparenz. Betroffenenrechte: Auskunft, Löschung, Portabilität. Meldepflicht bei Datenpanne: 72 Stunden.", wichtig: 5 },
  { begriff: "Social Engineering", kategorie: "Sicherheit", erklaerung: "Angriffe auf den 'Faktor Mensch'. Phishing (E-Mails), Vishing (Telefon), Pretexting (falsche Identität). Schutz: Schulungen, 2FA, Zero-Trust-Prinzip.", wichtig: 4 },
  { begriff: "Zero Trust", kategorie: "Sicherheit", erklaerung: "Sicherheitsprinzip: 'Vertraue niemandem, verifiziere alles'. Jeder Zugriff muss authentifiziert werden, auch intern. Gegenteil zum alten 'Castle-and-Moat'-Ansatz.", wichtig: 3 },
  { begriff: "IDS / IPS", kategorie: "Sicherheit", erklaerung: "Intrusion Detection System (erkennt Angriffe, meldet) vs. Intrusion Prevention System (erkennt UND blockiert automatisch). Host-based (HIDS) oder Network-based (NIDS).", wichtig: 3 },
  // WISO
  { begriff: "Sozialversicherung", kategorie: "WiSo", erklaerung: "5 Säulen: Krankenversicherung (KV), Rentenversicherung (RV), Arbeitslosenversicherung (AV), Unfallversicherung (UV, nur AG zahlt!), Pflegeversicherung (PV). Paritätisch finanziert (AN+AG je 50%) außer UV.", wichtig: 5 },
  { begriff: "Ausbildungsvertrag", kategorie: "WiSo", erklaerung: "Schriftlicher Vertrag zwischen Azubi und Ausbildungsbetrieb. Pflichtinhalte: Ausbildungsberuf, Dauer, Vergütung, Urlaub, Probezeit (min. 1, max. 4 Monate), Kündigungsfristen.", wichtig: 5 },
  { begriff: "Tarifvertrag", kategorie: "WiSo", erklaerung: "Vertrag zwischen Gewerkschaft und Arbeitgeberverband. Regelt Mindestlöhne, Arbeitszeiten, Urlaubsanspruch. Gilt für Mitglieder beider Seiten. Günstigkeitsprinzip: Betrieb darf nur bessere Konditionen anbieten.", wichtig: 4 },
  { begriff: "Betriebsrat", kategorie: "WiSo", erklaerung: "Gewähltes Gremium der Arbeitnehmer. Mitbestimmungsrecht bei: Arbeitszeiten, Urlaub, Einstellungen, Kündigungen. Ab 5 Beschäftigte möglich. Betriebsverfassungsgesetz (BetrVG).", wichtig: 4 },
  { begriff: "GmbH vs AG", kategorie: "WiSo", erklaerung: "GmbH: Mindestkapital 25.000€ (Hälfte bei Gründung), Gesellschafter, Geschäftsführer, beschränkte Haftung. AG: Mindestkapital 50.000€, Aktionäre, Vorstand+Aufsichtsrat, börsennotierbar.", wichtig: 4 },
  { begriff: "Jugendarbeitsschutz", kategorie: "WiSo", erklaerung: "Gilt für unter 18-Jährige. Max. 8h/Tag, 40h/Woche. Kein Nachtdienst (ab 22 Uhr), keine Akkordarbeit. 30 Tage Urlaub/Jahr. Gesetzliche Grundlage: JArbSchG.", wichtig: 4 },
  { begriff: "Kündigung", kategorie: "WiSo", erklaerung: "Probezeit: fristlos oder mit 2 Wochen Frist. Nach Probezeit: ordentliche Kündigung nur aus wichtigem Grund möglich (Azubi ist geschützter!). Außerordentlich (fristlos): bei schwerem Fehlverhalten.", wichtig: 4 },
  { begriff: "Umsatzsteuer (USt)", kategorie: "WiSo", erklaerung: "Normaler Satz: 19%. Ermäßigt: 7% (Lebensmittel, Bücher). Vorsteuer: USt die ein Unternehmen bezahlt, kann es abziehen. Brutto = Netto × 1,19. Netto = Brutto / 1,19", wichtig: 4 },
  // HARDWARE
  { begriff: "CPU Begriffe", kategorie: "Hardware", erklaerung: "Cores (Kerne), Threads, Taktfrequenz (GHz), Cache (L1/L2/L3). Hyper-Threading: 1 physischer Core = 2 logische Threads. TDP = Thermal Design Power (Wärmeleistung)", wichtig: 3 },
  { begriff: "Speichertypen", kategorie: "Hardware", erklaerung: "RAM (flüchtig, schnell, teuer): DDR4/DDR5. ROM (nicht flüchtig). SSD (NAND Flash, schnell). HDD (magnetisch, günstig, langsamer). NVMe M.2: schnellste SSD (PCIe)", wichtig: 4 },
  { begriff: "Schnittstellen", kategorie: "Hardware", erklaerung: "USB (Universal Serial Bus): USB 2.0 (480 Mbit/s), USB 3.0 (5 Gbit/s), USB 4 (40 Gbit/s). Thunderbolt 4: 40 Gbit/s. HDMI vs DisplayPort. SATA vs NVMe", wichtig: 3 },
];

const quizFragen = [
  { frage: "Welche Schicht des OSI-Modells ist für das Routing (IP-Weiterleitung) zuständig?", antworten: ["Schicht 1 – Physical", "Schicht 2 – Data Link", "Schicht 3 – Network", "Schicht 4 – Transport"], richtig: 2, erklaerung: "Schicht 3 (Network Layer) ist für logische Adressierung (IP) und Routing zuständig. Router arbeiten auf dieser Schicht." },
  { frage: "Was ist die nutzbare Hostanzahl in einem /26 Subnetz?", antworten: ["30 Hosts", "62 Hosts", "126 Hosts", "64 Hosts"], richtig: 1, erklaerung: "/26 = 6 Hostbits = 2^6 = 64 Adressen. Davon -2 (Netz- und Broadcast) = 62 nutzbare Hosts." },
  { frage: "RAID 5 benötigt mindestens wie viele Festplatten?", antworten: ["2 Festplatten", "3 Festplatten", "4 Festplatten", "5 Festplatten"], richtig: 1, erklaerung: "RAID 5 benötigt mindestens 3 Festplatten. Es nutzt Striping mit verteilter Parität – eine Platte darf ausfallen." },
  { frage: "Welche Unfallversicherung zahlt NUR der Arbeitgeber (AG)?", antworten: ["Krankenversicherung", "Rentenversicherung", "Unfallversicherung", "Pflegeversicherung"], richtig: 2, erklaerung: "Die gesetzliche Unfallversicherung (Berufsgenossenschaft) wird ausschließlich vom Arbeitgeber bezahlt. Alle anderen Sozialversicherungen werden paritätisch geteilt." },
  { frage: "Was bedeutet 'IaaS' im Cloud Computing?", antworten: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Intelligence as a Service"], richtig: 1, erklaerung: "IaaS = Infrastructure as a Service. Der Anbieter stellt virtuelle Infrastruktur bereit (Server, Storage, Netzwerk). Der Kunde verwaltet OS und Anwendungen selbst. Beispiel: AWS EC2, Azure VMs." },
  { frage: "Welches Protokoll wird für sichere SSH-Verbindungen verwendet?", antworten: ["Port 21", "Port 22", "Port 23", "Port 80"], richtig: 1, erklaerung: "SSH (Secure Shell) nutzt standardmäßig Port 22. FTP = 21, Telnet = 23, HTTP = 80, HTTPS = 443." },
  { frage: "Was ist die Meldepflicht bei einer Datenschutzverletzung nach DSGVO?", antworten: ["24 Stunden", "48 Stunden", "72 Stunden", "7 Tage"], richtig: 2, erklaerung: "Nach Art. 33 DSGVO müssen Datenpannen innerhalb von 72 Stunden der zuständigen Aufsichtsbehörde gemeldet werden – sofern ein Risiko für Betroffene besteht." },
  { frage: "Was ist der Unterschied zwischen symmetrischer und asymmetrischer Verschlüsselung?", antworten: ["Symmetrisch ist sicherer", "Asymmetrisch verwendet denselben Schlüssel für Ver- und Entschlüsselung", "Symmetrisch verwendet einen Schlüssel für beide Vorgänge", "Asymmetrisch ist schneller"], richtig: 2, erklaerung: "Symmetrisch: EIN Schlüssel für alles (schnell, z.B. AES). Asymmetrisch: Public Key zum Verschlüsseln, Private Key zum Entschlüsseln (sicher, aber langsamer, z.B. RSA). Hybridverfahren kombiniert beides." },
  { frage: "Was ist ein Betriebsrat?", antworten: ["Eine Behörde des Arbeitsamtes", "Ein von Arbeitnehmern gewähltes Gremium", "Die Unternehmensleitung", "Ein staatliches Kontrollorgan"], richtig: 1, erklaerung: "Der Betriebsrat ist ein von Arbeitnehmern gewähltes Gremium (ab 5 Beschäftigte). Er hat Mitbestimmungsrechte bei Arbeitszeiten, Urlaub, Einstellungen etc. Grundlage: BetrVG." },
  { frage: "In BaWü: Welche ZUSÄTZLICHEN Prüfungen schreibt die Berufsschule in der AP2?", antworten: ["Mathematik und Physik", "Englisch und EDV", "Deutsch und Gemeinschaftskunde", "Sport und Musik"], richtig: 2, erklaerung: "Baden-Württemberg macht sein 'eigenes Ding': Zusätzlich zur IHK-WiSo-Prüfung schreibt die Berufsschule BaWü noch Deutsch und Gemeinschaftskunde als schulische Prüfungen!" },
  { frage: "Was ist der korrekte normale USt-Satz in Deutschland?", antworten: ["7%", "15%", "19%", "21%"], richtig: 2, erklaerung: "Normaler Mehrwertsteuersatz = 19%. Ermäßigt (Lebensmittel, Bücher) = 7%. Brutto = Netto × 1,19. Netto herausrechnen = Brutto ÷ 1,19." },
  { frage: "Was bedeutet DHCP?", antworten: ["Dynamic Host Control Protocol", "Dynamic Host Configuration Protocol", "Distributed Host Configuration Protocol", "Dynamic Host Connection Protocol"], richtig: 1, erklaerung: "DHCP = Dynamic Host Configuration Protocol. Vergibt automatisch IP-Adresse, Subnetzmaske, Standard-Gateway und DNS-Server an Clients. Ports: 67 (Server), 68 (Client)." },
];

const lernPlan = [
  { woche: "Woche 1", fokus: "Netzwerkgrundlagen", aufgaben: ["OSI-Modell auswendig lernen (alle 7 Schichten + Merkhilfe)", "IP-Adressen und Subnetting üben", "DHCP, DNS, TCP, UDP verstehen", "5 Subnetting-Aufgaben lösen"], prioritaet: "HOCH" },
  { woche: "Woche 2", fokus: "Systemadministration", aufgaben: ["RAID 0,1,5,6,10 lernen (Unterschiede + Mindestplatten)", "Virtualisierung: Hypervisor Typ 1 vs Typ 2", "Cloud: IaaS, PaaS, SaaS mit Beispielen", "Backup-Strategien: Voll, Differenziell, Inkrementell"], prioritaet: "HOCH" },
  { woche: "Woche 3", fokus: "IT-Sicherheit + DSGVO", aufgaben: ["Verschlüsselung: symmetrisch vs asymmetrisch", "DSGVO: Grundsätze, Betroffenenrechte, 72h-Meldepflicht", "Firewall-Typen und VPN verstehen", "Social Engineering Angriffe kennen"], prioritaet: "HOCH" },
  { woche: "Woche 4", fokus: "WiSo", aufgaben: ["5 Sozialversicherungen auswendig (inkl. wer zahlt was)", "Ausbildungsvertrag Pflichtinhalte", "Probezeit, Kündigung, Tarifvertrag", "Unternehmensformen: GmbH, AG, GbR, OHG"], prioritaet: "MITTEL" },
  { woche: "Woche 5", fokus: "Wiederholung + Alte Prüfungen", aufgaben: ["Alte IHK-Prüfungen lösen (auf ihk-aka.de)", "Schwachstellen identifizieren", "Fachbegriffe nochmal durchgehen", "Mini-Quiz täglich machen"], prioritaet: "HOCH" },
];

// ============================================================
// KOMPONENTEN
// ============================================================

function PruefungsStrukturKarte({ p, onClick }) {
  return (
    <div
      onClick={() => onClick(p)}
      style={{
        background: "#1a1a2e",
        border: `2px solid ${p.farbe}`,
        borderRadius: 12,
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontSize: 28 }}>{p.icon}</span>
        <span style={{ background: p.farbe, color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 13, fontWeight: 700 }}>{p.gewicht}</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4 }}>{p.titel}</div>
      <div style={{ color: "#aaa", fontSize: 12 }}>⏱ {p.dauer}</div>
      {p.bawuHinweis.includes("🚨") && (
        <div style={{ marginTop: 8, background: "#ff6b6b22", border: "1px solid #ff6b6b", borderRadius: 6, padding: "4px 8px", fontSize: 11, color: "#ff6b6b" }}>
          🚨 BaWü Spezial!
        </div>
      )}
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000a", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#12122a", border: `2px solid ${item.farbe}`, borderRadius: 16, maxWidth: 600, width: "100%", maxHeight: "80vh", overflowY: "auto", padding: 24 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{item.icon} {item.titel}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#aaa", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <span style={{ background: item.farbe + "33", color: item.farbe, borderRadius: 8, padding: "3px 10px", fontSize: 12 }}>Gewicht: {item.gewicht}</span>
          <span style={{ background: "#ffffff11", color: "#ccc", borderRadius: 8, padding: "3px 10px", fontSize: 12 }}>⏱ {item.dauer}</span>
          <span style={{ background: "#ffffff11", color: "#ccc", borderRadius: 8, padding: "3px 10px", fontSize: 12 }}>📝 {item.format}</span>
        </div>
        {item.bawuHinweis && (
          <div style={{ background: item.bawuHinweis.includes("🚨") ? "#ff6b6b22" : "#ffffff11", border: `1px solid ${item.bawuHinweis.includes("🚨") ? "#ff6b6b" : "#444"}`, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: item.bawuHinweis.includes("🚨") ? "#ff9999" : "#ccc" }}>
            {item.bawuHinweis}
          </div>
        )}
        <div style={{ fontWeight: 700, color: "#fff", marginBottom: 8 }}>📚 Prüfungsthemen:</div>
        {item.themen.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6, color: t.startsWith("⚠️") ? "#ffd166" : "#ddd", fontSize: 13 }}>
            <span style={{ flexShrink: 0 }}>{t.startsWith("⚠️") ? "" : "▸"}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FachbegriffeTab() {
  const [suche, setSuche] = useState("");
  const [kat, setKat] = useState("Alle");
  const [offen, setOffen] = useState(null);
  const kategorien = ["Alle", ...new Set(fachbegriffe.map(f => f.kategorie))];
  const gefiltert = fachbegriffe.filter(f =>
    (kat === "Alle" || f.kategorie === kat) &&
    (f.begriff.toLowerCase().includes(suche.toLowerCase()) || f.erklaerung.toLowerCase().includes(suche.toLowerCase()))
  );
  const sternFarbe = n => n >= 5 ? "#ff6b6b" : n >= 4 ? "#ffd166" : "#aaa";
  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input value={suche} onChange={e => setSuche(e.target.value)} placeholder="🔍 Begriff suchen..." style={{ flex: 1, minWidth: 180, background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14 }} />
        <select value={kat} onChange={e => setKat(e.target.value)} style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14 }}>
          {kategorien.map(k => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{gefiltert.length} Begriffe gefunden • 🔴 = sehr wichtig für Prüfung</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {gefiltert.map((f, i) => (
          <div key={i} onClick={() => setOffen(offen === i ? null : i)} style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, padding: "12px 16px", cursor: "pointer", transition: "border-color 0.2s", borderColor: offen === i ? "#7b2d8b" : "#2a2a4a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{f.begriff}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ background: "#ffffff11", color: "#aaa", borderRadius: 6, padding: "2px 8px", fontSize: 11 }}>{f.kategorie}</span>
                <span style={{ color: sternFarbe(f.wichtig), fontSize: 13 }}>{"★".repeat(f.wichtig)}</span>
                <span style={{ color: "#666", fontSize: 14 }}>{offen === i ? "▲" : "▼"}</span>
              </div>
            </div>
            {offen === i && (
              <div style={{ marginTop: 10, color: "#ccc", fontSize: 13, lineHeight: 1.6, borderTop: "1px solid #2a2a4a", paddingTop: 10 }}>
                {f.erklaerung}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizTab() {
  const [idx, setIdx] = useState(0);
  const [gewaehlt, setGewaehlt] = useState(null);
  const [richtig, setRichtig] = useState(0);
  const [falsch, setFalsch] = useState(0);
  const [fertig, setFertig] = useState(false);
  const [shuffled] = useState(() => [...quizFragen].sort(() => Math.random() - 0.5));

  const frage = shuffled[idx];

  const antworten = (a) => {
    if (gewaehlt !== null) return;
    setGewaehlt(a);
    if (a === frage.richtig) setRichtig(r => r + 1);
    else setFalsch(f => f + 1);
  };

  const weiter = () => {
    if (idx + 1 >= shuffled.length) { setFertig(true); return; }
    setIdx(i => i + 1);
    setGewaehlt(null);
  };

  const neustart = () => { setIdx(0); setGewaehlt(null); setRichtig(0); setFalsch(0); setFertig(false); };

  if (fertig) {
    const pct = Math.round((richtig / shuffled.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "💪" : "📚"}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Quiz beendet!</div>
        <div style={{ fontSize: 18, color: pct >= 80 ? "#06d6a0" : pct >= 60 ? "#ffd166" : "#ff6b6b", marginBottom: 24 }}>{richtig}/{shuffled.length} richtig — {pct}%</div>
        <div style={{ color: "#ccc", marginBottom: 24, fontSize: 14 }}>
          {pct >= 80 ? "Ausgezeichnet! Du bist gut vorbereitet 🎉" : pct >= 60 ? "Gut! Weiter so, noch ein bisschen üben 💪" : "Noch mehr üben – du schaffst das! 📖"}
        </div>
        <button onClick={neustart} style={{ background: "linear-gradient(135deg, #7b2d8b, #00b4d8)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Nochmal versuchen</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ color: "#aaa", fontSize: 13 }}>Frage {idx + 1} von {shuffled.length}</span>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ color: "#06d6a0", fontSize: 13 }}>✓ {richtig}</span>
          <span style={{ color: "#ff6b6b", fontSize: 13 }}>✗ {falsch}</span>
        </div>
      </div>
      <div style={{ background: "#0a0a1a", borderRadius: 4, height: 4, marginBottom: 20 }}>
        <div style={{ background: "linear-gradient(90deg, #7b2d8b, #00b4d8)", height: "100%", borderRadius: 4, width: `${((idx) / shuffled.length) * 100}%`, transition: "width 0.3s" }} />
      </div>
      <div style={{ background: "#1a1a2e", borderRadius: 14, padding: "20px", marginBottom: 20, fontSize: 15, color: "#fff", fontWeight: 600, lineHeight: 1.5 }}>
        {frage.frage}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {frage.antworten.map((a, i) => {
          let bg = "#1a1a2e", border = "#2a2a4a", color = "#ddd";
          if (gewaehlt !== null) {
            if (i === frage.richtig) { bg = "#06d6a022"; border = "#06d6a0"; color = "#06d6a0"; }
            else if (i === gewaehlt) { bg = "#ff6b6b22"; border = "#ff6b6b"; color = "#ff6b6b"; }
          } else if (gewaehlt === i) { bg = "#7b2d8b33"; border = "#7b2d8b"; }
          return (
            <button key={i} onClick={() => antworten(i)} disabled={gewaehlt !== null} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "12px 16px", color, fontSize: 14, textAlign: "left", cursor: gewaehlt !== null ? "default" : "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
              <span style={{ marginRight: 10, opacity: 0.6 }}>{["A", "B", "C", "D"][i]})</span>{a}
            </button>
          );
        })}
      </div>
      {gewaehlt !== null && (
        <div>
          <div style={{ background: gewaehlt === frage.richtig ? "#06d6a022" : "#ff6b6b22", border: `1px solid ${gewaehlt === frage.richtig ? "#06d6a0" : "#ff6b6b"}`, borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700, color: gewaehlt === frage.richtig ? "#06d6a0" : "#ff6b6b" }}>{gewaehlt === frage.richtig ? "✓ Richtig!" : "✗ Leider falsch."} </span>
            {frage.erklaerung}
          </div>
          <button onClick={weiter} style={{ width: "100%", background: "linear-gradient(135deg, #7b2d8b, #00b4d8)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            {idx + 1 >= shuffled.length ? "Ergebnis anzeigen 🏁" : "Nächste Frage →"}
          </button>
        </div>
      )}
    </div>
  );
}

function LernplanTab() {
  return (
    <div>
      <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: "#aaa", lineHeight: 1.7 }}>
        💡 <strong style={{ color: "#fff" }}>Strategie für dich:</strong> Du lernst besser mit kurzen, häufigen Einheiten (30-45 Min.) als mit langen Sessions. Jeden Tag ein kleines Ziel. Markiere erledigte Aufgaben ab!
      </div>
      {lernPlan.map((w, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <div style={{ background: w.prioritaet === "HOCH" ? "#ff6b6b" : "#ffd166", color: "#000", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 800 }}>{w.woche}</div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{w.fokus}</div>
            <div style={{ marginLeft: "auto", background: w.prioritaet === "HOCH" ? "#ff6b6b22" : "#ffd16622", color: w.prioritaet === "HOCH" ? "#ff6b6b" : "#ffd166", borderRadius: 6, padding: "2px 8px", fontSize: 11 }}>{w.prioritaet}</div>
          </div>
          <div style={{ background: "#1a1a2e", borderRadius: 10, padding: 14 }}>
            {w.aufgaben.map((a, j) => (
              <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: j < w.aufgaben.length - 1 ? 8 : 0 }}>
                <span style={{ color: "#7b2d8b", marginTop: 2, flexShrink: 0 }}>☐</span>
                <span style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 20 }}>
        <div style={{ fontWeight: 700, color: "#ffd166", marginBottom: 12 }}>🔗 Wichtige Ressourcen</div>
        {[
          ["IHK Alte Prüfungen", "ihk-aka.de – kostenlose Prüfungsaufgaben"],
          ["it-berufe-podcast.de", "Prüfungskatalog & Erklärungen"],
          ["fachinformatiker.de", "Forum – andere Azubis helfen dir"],
          ["subnet.today", "Subnetting üben online"],
        ].map(([n, h], i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: "#00b4d8" }}>→</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>{n}:</span>
            <span style={{ color: "#888" }}>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HAUPTAPP
// ============================================================

export default function App() {
  const [tab, setTab] = useState("struktur");
  const [modal, setModal] = useState(null);

  const tabs = [
    { id: "struktur", label: "📋 Prüfungsstruktur", icon: "📋" },
    { id: "begriffe", label: "📚 Fachbegriffe", icon: "📚" },
    { id: "quiz", label: "🧠 Quiz", icon: "🧠" },
    { id: "plan", label: "📅 Lernplan", icon: "📅" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0a0a1a", minHeight: "100vh", color: "#fff", maxWidth: 700, margin: "0 auto", padding: "0 0 40px" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #12122a 0%, #1a1a3e 100%)", borderBottom: "1px solid #2a2a4a", padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 32 }}>🎯</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(90deg, #00b4d8, #7b2d8b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FISI IHK Prüfungshilfe</div>
            <div style={{ fontSize: 12, color: "#888" }}>Baden-Württemberg • AP1 + AP2 • Dein persönlicher Lernbegleiter</div>
          </div>
        </div>
        <div style={{ background: "#ff6b6b22", border: "1px solid #ff6b6b55", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#ffaaaa", marginTop: 10 }}>
          🚨 <strong>BaWü Spezial:</strong> In Baden-Württemberg schreibt die Berufsschule ZUSÄTZLICH Deutsch + Gemeinschaftskunde. Die IHK-Teile sind bundeseinheitlich.
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid #2a2a4a", background: "#0d0d20", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, minWidth: 80, background: "none", border: "none", borderBottom: tab === t.id ? "2px solid #7b2d8b" : "2px solid transparent", color: tab === t.id ? "#fff" : "#666", padding: "12px 8px", fontSize: 12, cursor: "pointer", fontWeight: tab === t.id ? 700 : 400, transition: "all 0.2s", fontFamily: "inherit" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "20px" }}>
        {tab === "struktur" && (
          <div>
            {/* Gesamtübersicht */}
            <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 16, marginBottom: 20 }}>
              <div style={{ fontWeight: 800, color: "#fff", marginBottom: 12, fontSize: 15 }}>📊 Gesamtgewichtung der Note</div>
              {pruefungsStruktur.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <div style={{ flex: 1, fontSize: 12, color: "#ccc" }}>{p.titel.split("–")[1]?.trim() || p.titel}</div>
                  <div style={{ background: p.farbe + "33", color: p.farbe, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700, minWidth: 36, textAlign: "center" }}>{p.gewicht}</div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #2a2a4a", marginTop: 10, paddingTop: 10, fontSize: 12, color: "#888" }}>
                👉 Das Projekt (50%) ist entscheidend! Aber auch die schriftlichen Teile nicht vernachlässigen.
              </div>
            </div>

            <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12 }}>Klicke auf einen Teil für Details:</div>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              {pruefungsStruktur.map(p => <PruefungsStrukturKarte key={p.id} p={p} onClick={setModal} />)}
            </div>
          </div>
        )}
        {tab === "begriffe" && <FachbegriffeTab />}
        {tab === "quiz" && <QuizTab />}
        {tab === "plan" && <LernplanTab />}
      </div>

      <Modal item={modal} onClose={() => setModal(null)} />
    </div>
  );
}
