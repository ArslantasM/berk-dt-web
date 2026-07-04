# Berk Digital Twin — Kanıtlanabilir Simülasyon Altyapısı

Deterministik (çapraz-platform **bit-aynı** `state_hash`), denetlenebilir,
çatallanabilir simülasyon çekirdeğinin tarayıcıda çalışan WASM vitrini.

**Canlı site:** https://arslantasm.github.io/berk-dt-web/

## Yapı

| Sayfa | İçerik |
|---|---|
| `www/index.html` | 🌐 Açılış / dil seçici (TR · EN) — parçacık-ağ efekti |
| `www/tr.html` · `www/en.html` | Ana sayfa (kategori: Provable Simulation) — hero, What-If Engine, kanıt |
| `www/whitepaper_tr.html` · `www/whitepaper.html` | Whitepaper: "Kanıtlanabilir Simülasyon: Doğrulanabilir Karar Altyapısı" (TR/EN) |
| `www/rakip.html` · `www/rakip_en.html` | Rekabet analizi (TR/EN) |
| `www/demos.html` | 12 etkileşimli demo (rollback, netcode, akışkan, kum, CCD, …) — `?kiosk=8` fuar modu |
| `www/zaman.html` | ⏳ Zaman Yolcusu — geleceği mühürle, canlı doğrula |
| `www/mutabakat.html` | 🤝 Hash Mutabakatı — QR ile telefonunda koştur, aynı hash'i gör |
| `www/gpu.html` | ⚡ CPU ≡ GPU ≡ tarayıcı bit-aynılık kanıtı |
| `www/replay.html` | 🔍 Kayıt → yeniden koş → doğrula müfettişi |

`pkg/` derlenmiş WASM modülüdür (kaynak içermez).

## Kategori

Berk DT bir fizik motoru değil, bir **karar-doğrulama altyapısıdır**:
**Deterministik · Denetlenebilir · Çatallanabilir** — aynı girdi her makinede
bit-aynı sonuç verir; her karar kanıtlanabilir.

© 2026 LL BERK YAZILIM TEKNOLOJİLERİ A.Ş. — Tüm hakları saklıdır.
Bu depo yalnız tanıtım amaçlıdır; çekirdek kapalı kaynak/ticaridir.
