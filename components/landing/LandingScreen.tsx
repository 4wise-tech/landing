import React, { useMemo } from 'react';
import { Image, Linking, Platform, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeuralBackground } from '@/components/landing/NeuralBackground';
import { useColorScheme } from '@/components/useColorScheme';

const copy = {
  heroTitle: 'Geleceğin Akıllı Sistemlerini İnşa Ediyoruz',
  heroSubtitle: "AI Agent’lar, ölçeklenebilir yazılımlar ve kurumsal çözümler",
};

function openMail(to: string, subject: string) {
  const url = `mailto:${to}?subject=${encodeURIComponent(subject)}`;
  Linking.openURL(url);
}

export function LandingScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const { width } = useWindowDimensions();

  const cols = useMemo(() => {
    if (width >= 1000) return 3;
    if (width >= 720) return 2;
    return 1;
  }, [width]);

  const gap = 14;
  const cardW = cols === 1 ? '100%' : `${(100 - gap * (cols - 1)) / cols}%`;

  return (
    <View style={{ flex: 1, backgroundColor: Colors[scheme].background }}>
      <TopNav />
      <ScrollView contentContainerStyle={{ paddingBottom: 84 }}>
        <View style={{ position: 'relative', minHeight: 740 }}>
          <NeuralBackground />

          <Container style={{ paddingTop: 92, paddingBottom: 46 }}>
            <View style={{ alignItems: 'center' }}>
              <Badge text="AI-first • Kurumsal • Ölçeklenebilir" />

              <Text
                style={{
                  marginTop: 18,
                  fontSize: width >= 720 ? 54 : 38,
                  lineHeight: width >= 720 ? 60 : 44,
                  fontWeight: '800',
                  letterSpacing: -0.6,
                  textAlign: 'center',
                  color: isDark ? 'rgba(248,250,252,0.98)' : 'rgba(15,23,42,0.98)',
                  maxWidth: 920,
                }}>
                {copy.heroTitle}
              </Text>

              <Text
                style={{
                  marginTop: 12,
                  fontSize: width >= 720 ? 18 : 16,
                  lineHeight: width >= 720 ? 28 : 24,
                  textAlign: 'center',
                  color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.92)',
                  maxWidth: 740,
                }}>
                {copy.heroSubtitle}
              </Text>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: width >= 520 ? 'row' : 'column',
                  gap: 12,
                  width: width >= 520 ? undefined : '100%',
                  justifyContent: 'center',
                }}>
                <Button
                  label="Demo Talep Et"
                  onPress={() => openMail('hello@4wise.ai', 'Demo Talebi')}
                  style={{ paddingHorizontal: 18, paddingVertical: 12 }}
                />
                <Button
                  label="Çözümleri Keşfet"
                  variant="secondary"
                  onPress={() => Linking.openURL('#solutions')}
                  style={{ paddingHorizontal: 18, paddingVertical: 12 }}
                />
              </View>

              <View style={{ marginTop: 28, width: '100%', maxWidth: 980 }}>
                <GlassCard style={{ padding: 16 }}>
                  <View
                    style={{
                      flexDirection: width >= 720 ? 'row' : 'column',
                      gap: 16,
                      alignItems: width >= 720 ? 'center' : 'flex-start',
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: isDark ? 'rgba(226,232,240,0.92)' : 'rgba(15,23,42,0.92)',
                        }}>
                        B2B için tasarlandı
                      </Text>
                      <Text
                        style={{
                          marginTop: 6,
                          fontSize: 13,
                          lineHeight: 20,
                          color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)',
                        }}>
                        Kurumsal güvenlik standartları, sürdürülebilir mimari ve sürekli geliştirme ile AI tabanlı
                        sistemleri production’a taşırız.
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                      <Stat label="Hızlı Başlangıç" value="2-6 hafta" />
                      <Stat label="SLA & İzleme" value="7/24" />
                      <Stat label="Teslim Modeli" value="Uçtan uca" />
                    </View>
                  </View>
                </GlassCard>
              </View>
            </View>
          </Container>
        </View>

        <Section
          id="services"
          eyebrow="HİZMETLER"
          title="AI agent’lardan ölçeklenebilir yazılımlara"
          subtitle="Teknik derinliği yüksek ekiplerle, kurumsal beklentilere uygun şekilde uçtan uca teslim ederiz.">
          <View style={{ flexDirection: cols === 1 ? 'column' : 'row', flexWrap: 'wrap', gap }}>
            <ServiceCard
              width={cardW}
              title="AI Agent & Otomasyon"
              points={['Özel AI agent geliştirme', 'AI destekli iş süreçleri', 'Chatbot ve karar destek sistemleri']}
              accent="blue"
            />
            <ServiceCard
              width={cardW}
              title="Yazılım Geliştirme"
              points={['Web ve mobil uygulamalar', 'SaaS platformlar', 'API ve sistem entegrasyonları']}
              accent="green"
            />
            <ServiceCard
              width={cardW}
              title="Bakım & Destek"
              points={['7/24 sistem izleme', 'DevOps ve altyapı yönetimi', 'Sürekli iyileştirme ve güncellemeler']}
              accent="blue"
            />
          </View>
        </Section>

        <Section
          id="solutions"
          eyebrow="ÇÖZÜMLER"
          title="Kuruma özel, ölçülebilir sonuçlar"
          subtitle="AI’ı yalnızca demo değil; güvenlik, izlenebilirlik ve performansla production’da çalıştırırız.">
          <View style={{ flexDirection: cols === 1 ? 'column' : 'row', flexWrap: 'wrap', gap }}>
            {[
              { t: 'AI workforce (AI çalışan sistemleri)', d: 'Departman bazlı agent’lar ile görev otomasyonu ve hız.' },
              { t: 'Kuruma özel AI çözümleri', d: 'Veri, erişim ve süreçlerinize göre özelleştirilmiş agent’lar.' },
              { t: 'Veri ve otomasyon sistemleri', d: 'ETL, event-driven otomasyon, entegrasyon katmanı.' },
              { t: 'Operasyonel verimlilik', d: 'Maliyet, kalite ve süre metriklerine doğrudan etki.' },
            ].map((s, i) => (
              <FeatureCard key={i} width={cardW} title={s.t} desc={s.d} />
            ))}
          </View>
        </Section>

        <Section id="process" eyebrow="NASIL ÇALIŞIYORUZ" title="Hızlı, şeffaf ve ölçülebilir süreç">
          <View style={{ flexDirection: cols === 1 ? 'column' : 'row', flexWrap: 'wrap', gap }}>
            {[
              { step: 'Keşfet', d: 'Hedefleri, veri kaynaklarını ve riskleri netleştiririz.' },
              { step: 'Tasarla', d: 'Mimari, güvenlik ve agent stratejisini kurgularız.' },
              { step: 'Geliştir', d: 'MVP → pilot → üretim; hızlı iterasyon ve ölçüm.' },
              { step: 'Ölçekle', d: 'Performans, maliyet ve kapsamı kontrollü büyütürüz.' },
            ].map((p, i) => (
              <StepCard key={i} width={cardW} index={i + 1} title={p.step} desc={p.d} />
            ))}
          </View>
        </Section>

        <Section id="why" eyebrow="NEDEN 4WISE" title="Kurumsal güven veren, AI-first ekip">
          <View style={{ flexDirection: cols === 1 ? 'column' : 'row', flexWrap: 'wrap', gap }}>
            {[
              { t: 'AI-first yaklaşım', d: 'Agent, eval, guardrail ve telemetry odaklı geliştirme.' },
              { t: 'Ölçeklenebilir mimari', d: 'Modüler servisler, gözlemlenebilirlik, performans planı.' },
              { t: 'Hızlı ve esnek', d: 'Önceliklere göre iterasyon; çıktıyı haftalık görünür kılma.' },
              { t: 'Kurumsal güvenlik', d: 'Erişim, audit, veri izolasyonu ve güvenlik pratikleri.' },
            ].map((s, i) => (
              <WhyCard key={i} width={cardW} title={s.t} desc={s.d} />
            ))}
          </View>
        </Section>

        <Section id="cases" eyebrow="PROJE ÖRNEKLERİ" title="Sektörler arası uygulama deneyimi">
          <View style={{ flexDirection: cols === 1 ? 'column' : 'row', flexWrap: 'wrap', gap }}>
            {[
              {
                t: 'Sağlık teknolojileri',
                tag: 'Örnek çalışma',
                d: 'Randevu/triage süreçlerinde otomasyon ve karar destek. Güvenlik, izlenebilirlik ve entegrasyon odaklı teslim.',
              },
              {
                t: 'AI otomasyon sistemleri',
                tag: 'Örnek çalışma',
                d: 'Departman bazlı agent’lar ile iş akışlarını hızlandırma. Yetki modeli, audit trail ve gözlemlenebilirlik ile production kullanımı.',
              },
              {
                t: 'SaaS platformlar',
                tag: 'Örnek çalışma',
                d: 'Çok kiracılı mimari, entegrasyon katmanı ve analitik. Performans/maliyet optimizasyonu ve sürdürülebilir geliştirme süreci.',
              },
            ].map((c, i) => (
              <CaseCard key={i} width={cardW} title={c.t} tag={c.tag} desc={c.d} />
            ))}
          </View>
        </Section>

        <Section id="cta" eyebrow="BİR SONRAKİ ADIM" title="İşinizi akıllı sistemlerle dönüştürelim">
          <GlassCard style={{ padding: 18 }}>
            <View style={{ flexDirection: width >= 720 ? 'row' : 'column', gap: 14, alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: isDark ? 'rgba(226,232,240,0.92)' : 'rgba(15,23,42,0.92)',
                  }}>
                  30 dakikalık keşif görüşmesi planlayalım
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    lineHeight: 20,
                    color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)',
                  }}>
                  Hedeflerinize uygun agent yaklaşımını ve yol haritasını netleştirelim.
                </Text>
              </View>
              <View style={{ flexDirection: width >= 420 ? 'row' : 'column', gap: 10, width: width >= 420 ? undefined : '100%' }}>
                <Button label="İletişime Geç" variant="secondary" onPress={() => openMail('hello@4wise.ai', 'İletişim')} />
                <Button label="Demo Talep Et" onPress={() => openMail('hello@4wise.ai', 'Demo Talebi')} />
              </View>
            </View>
          </GlassCard>
        </Section>

        <Footer />
      </ScrollView>
    </View>
  );
}

function TopNav() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        paddingTop: Platform.OS === 'web' ? 14 : 42,
        paddingBottom: 10,
        zIndex: 10,
      }}>
      <Container
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image
            source={require('@/assets/images/4wise-logo-white.png')}
            resizeMode="contain"
            style={{ width: 96, height: 28 }}
            accessibilityLabel="4wise logo"
          />
          <View
            style={{
              width: 1,
              height: 18,
              backgroundColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.12)',
            }}
          />
          <Text style={{ fontSize: 12, fontWeight: '600', color: isDark ? 'rgba(148,163,184,0.9)' : 'rgba(51,65,85,0.88)' }}>
            AI & Software Studio
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {width >= 720 ? (
            <>
              <NavLink label="Hizmetler" href="#services" />
              <NavLink label="Çözümler" href="#solutions" />
              <NavLink label="Süreç" href="#process" />
              <NavLink label="Projeler" href="#cases" />
              <NavLink label="İletişim" href="#cta" />
            </>
          ) : null}
          <Button
            label="Demo"
            onPress={() => openMail('hello@4wise.ai', 'Demo Talebi')}
            style={{ paddingHorizontal: 14, paddingVertical: 10 }}
          />
        </View>
      </Container>
    </View>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <Pressable accessibilityRole="link" onPress={() => Linking.openURL(href)}>
      {({ pressed }) => (
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: isDark ? 'rgba(226,232,240,0.86)' : 'rgba(15,23,42,0.80)',
            opacity: pressed ? 0.7 : 1,
          }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

function Badge({ text }: { text: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)',
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
      }}>
      <Text style={{ fontSize: 12, fontWeight: '700', color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.88)' }}>
        {text}
      </Text>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)',
        backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
        minWidth: 118,
      }}>
      <Text style={{ fontSize: 11, fontWeight: '700', color: isDark ? 'rgba(148,163,184,0.9)' : 'rgba(51,65,85,0.82)' }}>
        {label}
      </Text>
      <Text style={{ marginTop: 4, fontSize: 14, fontWeight: '800', color: isDark ? 'rgba(226,232,240,0.95)' : 'rgba(15,23,42,0.95)' }}>
        {value}
      </Text>
    </View>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <Container style={{ paddingTop: 56, paddingBottom: 10 }}>
      <View nativeID={id} />
      <Text style={{ fontSize: 12, fontWeight: '800', letterSpacing: 1.2, color: isDark ? 'rgba(59,130,246,0.95)' : 'rgba(37,99,235,0.95)' }}>
        {eyebrow}
      </Text>
      <Text
        style={{
          marginTop: 10,
          fontSize: 28,
          lineHeight: 34,
          fontWeight: '800',
          letterSpacing: -0.3,
          color: isDark ? 'rgba(248,250,252,0.96)' : 'rgba(15,23,42,0.95)',
          maxWidth: 860,
        }}>
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            lineHeight: 22,
            color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)',
            maxWidth: 820,
          }}>
          {subtitle}
        </Text>
      ) : null}

      <View style={{ marginTop: 18 }}>{children}</View>
    </Container>
  );
}

function ServiceCard({
  width,
  title,
  points,
  accent,
}: {
  width: string;
  title: string;
  points: string[];
  accent: 'blue' | 'green';
}) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const c = accent === 'green' ? Colors.brand.green : Colors.brand.blue;
  return (
    <GlassCard style={{ padding: 16, width }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: c,
            shadowColor: c,
            shadowOpacity: 0.6,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 0 },
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: '800', color: isDark ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.95)' }}>
          {title}
        </Text>
      </View>
      <View style={{ marginTop: 12, gap: 10 }}>
        {points.map((p) => (
          <Bullet key={p} text={p} />
        ))}
      </View>
    </GlassCard>
  );
}

function Bullet({ text }: { text: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
      <View
        style={{
          marginTop: 6,
          width: 6,
          height: 6,
          borderRadius: 999,
          backgroundColor: isDark ? 'rgba(59,130,246,0.9)' : 'rgba(37,99,235,0.9)',
        }}
      />
      <Text style={{ flex: 1, fontSize: 13, lineHeight: 20, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)' }}>
        {text}
      </Text>
    </View>
  );
}

function FeatureCard({ width, title, desc }: { width: string; title: string; desc: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <GlassCard style={{ padding: 16, width }}>
      <Text style={{ fontSize: 15, fontWeight: '800', color: isDark ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.95)' }}>
        {title}
      </Text>
      <Text style={{ marginTop: 8, fontSize: 13, lineHeight: 20, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)' }}>
        {desc}
      </Text>
    </GlassCard>
  );
}

function StepCard({ width, index, title, desc }: { width: string; index: number; title: string; desc: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <GlassCard style={{ padding: 16, width }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? 'rgba(59,130,246,0.16)' : 'rgba(37,99,235,0.12)',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(59,130,246,0.35)' : 'rgba(37,99,235,0.28)',
          }}>
          <Text style={{ fontSize: 13, fontWeight: '900', color: isDark ? 'rgba(147,197,253,0.98)' : 'rgba(29,78,216,0.95)' }}>
            {index}
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: '800', color: isDark ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.95)' }}>
          {title}
        </Text>
      </View>
      <Text style={{ marginTop: 10, fontSize: 13, lineHeight: 20, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)' }}>
        {desc}
      </Text>
    </GlassCard>
  );
}

function WhyCard({ width, title, desc }: { width: string; title: string; desc: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <GlassCard style={{ padding: 16, width }}>
      <Text style={{ fontSize: 15, fontWeight: '800', color: isDark ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.95)' }}>
        {title}
      </Text>
      <Text style={{ marginTop: 8, fontSize: 13, lineHeight: 20, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)' }}>
        {desc}
      </Text>
    </GlassCard>
  );
}

function CaseCard({
  width,
  title,
  tag,
  desc,
}: {
  width: string;
  title: string;
  tag: string;
  desc: string;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <GlassCard style={{ padding: 16, width }}>
      <Text style={{ fontSize: 12, fontWeight: '800', color: isDark ? 'rgba(34,197,94,0.92)' : 'rgba(22,163,74,0.95)' }}>
        {tag}
      </Text>
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '850' as any, color: isDark ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.95)' }}>
        {title}
      </Text>
      <Text style={{ marginTop: 8, fontSize: 13, lineHeight: 20, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)' }}>
        {desc}
      </Text>
      <View style={{ marginTop: 12 }}>
        <Button
          label="Detay iste"
          variant="ghost"
          onPress={() => openMail('hello@4wise.ai', `Proje detayı: ${title}`)}
          textStyle={{ color: isDark ? 'rgba(147,197,253,0.95)' : 'rgba(37,99,235,0.95)' }}
        />
      </View>
    </GlassCard>
  );
}

function Footer() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const { width } = useWindowDimensions();
  const col = width >= 900 ? 'row' : 'column';

  return (
    <Container style={{ paddingTop: 56 }}>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)',
          paddingTop: 22,
          paddingBottom: 26,
          flexDirection: col,
          gap: 18,
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1 }}>
          <Image source={require('@/assets/images/4wise-logo-white.png')} resizeMode="contain" style={{ width: 112, height: 32 }} />
          <Text style={{ marginTop: 10, fontSize: 13, lineHeight: 20, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)', maxWidth: 520 }}>
            4wise, yapay zeka tabanlı sistemler geliştiren, AI agent’lar oluşturan ve ölçeklenebilir yazılım çözümleri sunan bir teknoloji şirketidir.
          </Text>
        </View>

        <View style={{ flexDirection: width >= 520 ? 'row' : 'column', gap: 18 }}>
          <FooterCol title="Hizmetler" items={['AI Agent & Otomasyon', 'Yazılım Geliştirme', 'Bakım & Destek']} />
          <FooterCol title="İletişim" items={['hello@4wise.ai', 'İstanbul / Remote', 'Demo: 30 dk görüşme']} />
          <FooterCol title="Yasal" items={['Gizlilik', 'KVKK', 'Çerez Politikası']} />
        </View>
      </View>
      <Text style={{ fontSize: 12, color: isDark ? 'rgba(100,116,139,0.9)' : 'rgba(100,116,139,0.9)', paddingBottom: 40 }}>
        © {new Date().getFullYear()} 4wise. Tüm hakları saklıdır.
      </Text>
    </Container>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View style={{ minWidth: 180, gap: 10 }}>
      <Text style={{ fontSize: 12, fontWeight: '900', letterSpacing: 1.1, color: isDark ? 'rgba(226,232,240,0.9)' : 'rgba(15,23,42,0.85)' }}>
        {title.toUpperCase()}
      </Text>
      <View style={{ gap: 8 }}>
        {items.map((it) => (
          <Text key={it} style={{ fontSize: 13, color: isDark ? 'rgba(148,163,184,0.95)' : 'rgba(51,65,85,0.9)' }}>
            {it}
          </Text>
        ))}
      </View>
    </View>
  );
}

