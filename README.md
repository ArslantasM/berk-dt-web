# Berk Digital Twin — Canlı Demolar

Deterministik (çapraz-platform **bit-aynı** `state_hash`) fizik çekirdeğinin
tarayıcıda çalışan WASM vitrini.

**Canlı site:** https://arslantasm.github.io/berk-dt-web/

| Sayfa | İçerik |
|---|---|
| `www/` | Ana sayfa |
| `www/demos.html` | 12 etkileşimli demo (rollback, netcode, akışkan, kum, CCD, …) — `?kiosk=8` ile fuar modu |
| `www/zaman.html` | ⏳ Zaman Yolcusu — geleceği mühürle, canlı doğrula |
| `www/mutabakat.html` | 🤝 Hash Mutabakatı — QR ile telefonunda koştur, aynı hash'i gör |
| `www/gpu.html` | CPU ≡ GPU ≡ tarayıcı bit-aynılık kanıtı |
| `www/replay.html` | Kayıt → yeniden koş → doğrula müfettişi |
| `www/rakip.html` | Rekabet analizi |

`pkg/` derlenmiş WASM modülüdür (kaynak içermez).

© 2026 LL BERK YAZILIM TEKNOLOJİLERİ A.Ş. — Tüm hakları saklıdır.
Bu depo yalnız tanıtım amaçlıdır; çekirdek kapalı kaynak/ticaridir.
