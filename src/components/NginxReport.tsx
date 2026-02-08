import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  AlertCircle,
  Target,
  GitCompare,
  Map,
  Terminal,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function NginxReport() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['diagnosis', 'objective', 'analysis', 'roadmap'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-5xl">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="font-semibold text-sm tracking-tight">SOP: Nginx Redirections</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'diagnosis', label: 'Diagnóstico' },
              { id: 'objective', label: 'Objetivo' },
              { id: 'analysis', label: 'Análisis' },
              { id: 'roadmap', label: 'Hoja de Ruta' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2 print:hidden"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="font-mono text-xs">v1.0.0</Badge>
            <Badge variant="secondary" className="text-xs">Technical Documentation</Badge>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            SOP: Estrategia de Redirecciones Nginx
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed">
            Procedimiento operativo estándar para la implementación de redirecciones 301
            en entornos Nginx orientadas a la transferencia de autoridad de dominio.
          </p>
        </div>

        <Separator className="my-12" />

        <section id="diagnosis" className="mb-16 scroll-mt-20">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-neutral-100 mt-1">
              <AlertCircle className="h-5 w-5 text-neutral-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
                1. Diagnóstico de Infraestructura
              </h2>
              <p className="text-neutral-600">Análisis del entorno actual del servidor</p>
            </div>
          </div>

          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Detección de Entorno Nginx</CardTitle>
              <CardDescription>
                Se ha identificado que el servidor web utiliza Nginx como motor principal.
                En esta configuración, los archivos <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono">.htaccess</code> son
                inoperantes ya que este mecanismo es exclusivo de Apache.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-neutral-600" />
                    <span className="text-sm font-medium text-neutral-700">Validación de ausencia del archivo</span>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div className="text-neutral-400 mb-1">$ ls -la .htaccess</div>
                    <div className="text-red-400">ls: cannot access '.htaccess': No such file or directory</div>
                  </div>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-neutral-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-neutral-700 leading-relaxed">
                      <strong className="text-neutral-900">Implicación técnica:</strong> Cualquier intento de
                      configurar redirecciones mediante <code className="px-1.5 py-0.5 bg-neutral-200 rounded font-mono">.htaccess</code> será
                      ignorado por el servidor. Se requiere una estrategia alternativa compatible con Nginx.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="objective" className="mb-16 scroll-mt-20">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-neutral-100 mt-1">
              <Target className="h-5 w-5 text-neutral-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
                2. Objetivo Técnico: Transferencia de Autoridad
              </h2>
              <p className="text-neutral-600">Definición del propósito estratégico</p>
            </div>
          </div>

          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Contexto y Finalidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-900 mb-1">Estado Actual</div>
                    <div className="text-sm text-green-700 leading-relaxed">
                      Las URLs del dominio actual permanecen <strong>activas y completamente operativas</strong>.
                      No existe urgencia inmediata para implementar las redirecciones.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <ArrowRight className="h-5 w-5 text-neutral-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-neutral-900 mb-1">Objetivo Principal</div>
                    <div className="text-sm text-neutral-700 leading-relaxed">
                      El propósito fundamental de las redirecciones 301 es la <strong>transferencia de autoridad
                      SEO</strong> al nuevo dominio. Estas redirecciones se activarán en el momento exacto del
                      lanzamiento del nuevo sitio web.
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-neutral-900 pl-4 py-2">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  <strong className="text-neutral-900">Ventana temporal:</strong> Las redirecciones deben implementarse
                  estratégicamente cuando el nuevo sitio esté completamente preparado para recibir tráfico, maximizando
                  así la preservación del ranking y la autoridad de dominio acumulada.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="analysis" className="mb-16 scroll-mt-20">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-neutral-100 mt-1">
              <GitCompare className="h-5 w-5 text-neutral-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
                3. Análisis de Opciones y Lógica
              </h2>
              <p className="text-neutral-600">Evaluación comparativa de métodos disponibles</p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-red-200 bg-red-50/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">Descartado</Badge>
                  <CardTitle className="text-lg">functions.php (WordPress)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Aunque técnicamente viable, esta aproximación implica ejecutar código PHP en cada solicitud HTTP,
                    generando sobrecarga innecesaria en el servidor.
                  </p>
                  <div className="bg-white border border-red-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-red-900 mb-2">Impactos negativos:</div>
                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                      <li>Incremento significativo de latencia del servidor</li>
                      <li>Mayor consumo de recursos de procesamiento</li>
                      <li>Pérdida de eficiencia en alto volumen de tráfico</li>
                      <li>Dificulta el escalamiento horizontal</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-green-200 bg-green-50/50 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600 text-xs">Recomendado</Badge>
                    <CardTitle className="text-base">Panel de Control Pressable</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                    Solución nativa a nivel de infraestructura que opera directamente en la capa de Nginx.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Cero impacto en latencia</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Configuración persistente</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Gestión centralizada</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50/50 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600 text-xs">Recomendado</Badge>
                    <CardTitle className="text-base">Plugin Redirection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                    Plugin de WordPress optimizado para gestión de redirecciones con mínima sobrecarga.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Interfaz amigable</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Importación masiva CSV</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Monitorización de errores</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="roadmap" className="mb-16 scroll-mt-20">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 rounded-lg bg-neutral-100 mt-1">
              <Map className="h-5 w-5 text-neutral-900" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
                4. Hoja de Ruta de Ejecución
              </h2>
              <p className="text-neutral-600">Plan de implementación secuencial</p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-sm font-bold">
                    1
                  </div>
                  <CardTitle className="text-lg">Mapeo de URLs mediante CSV</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Crear un archivo CSV estructurado con el mapeo completo de URLs antiguas a nuevas.
                  </p>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                    <div className="text-xs font-medium text-neutral-600 mb-2 font-mono">Formato esperado:</div>
                    <div className="bg-white rounded border border-neutral-300 p-3 font-mono text-xs overflow-x-auto">
                      <div className="text-neutral-500 mb-1"># source_url,target_url,code</div>
                      <div>/old-page-1,https://nuevo-dominio.com/nueva-pagina-1,301</div>
                      <div>/old-page-2,https://nuevo-dominio.com/nueva-pagina-2,301</div>
                      <div>/category/old,https://nuevo-dominio.com/categoria/nueva,301</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-neutral-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Validar que cada URL de origen sea accesible actualmente</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-neutral-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Verificar que las URLs de destino estén correctamente formadas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-sm font-bold">
                    2
                  </div>
                  <CardTitle className="text-lg">Carga en Entorno de Staging</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Implementar las redirecciones primero en el ambiente de pruebas para validación exhaustiva.
                  </p>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-2">
                    <div className="text-sm font-medium text-neutral-900">Checklist de validación:</div>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <div className="w-4 h-4 border border-neutral-300 rounded flex-shrink-0 mt-0.5" />
                        <span>Verificar código de respuesta HTTP 301</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <div className="w-4 h-4 border border-neutral-300 rounded flex-shrink-0 mt-0.5" />
                        <span>Confirmar destino correcto de cada redirección</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <div className="w-4 h-4 border border-neutral-300 rounded flex-shrink-0 mt-0.5" />
                        <span>Pruebas con diferentes user agents</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <div className="w-4 h-4 border border-neutral-300 rounded flex-shrink-0 mt-0.5" />
                        <span>Validación de preservación de parámetros query string</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-sm font-bold">
                    3
                  </div>
                  <CardTitle className="text-lg">Activación en Producción</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Desplegar las redirecciones en producción sincronizadamente con el lanzamiento del nuevo dominio.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-amber-900 mb-1">Momento crítico</div>
                        <div className="text-sm text-amber-700 leading-relaxed">
                          Las redirecciones deben activarse <strong>únicamente cuando el nuevo sitio esté completamente
                          funcional</strong> y listo para recibir tráfico. Un despliegue prematuro puede generar errores
                          404 y pérdida de autoridad.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-2">
                    <div className="text-sm font-medium text-neutral-900">Post-despliegue:</div>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Monitorización de logs de servidor durante las primeras 48 horas</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Análisis de Google Search Console para detección de errores</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Seguimiento de métricas de tráfico y conversión</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        <footer className="text-center text-sm text-neutral-500 py-8">
          <p>Documento generado para uso técnico interno</p>
          <p className="mt-1">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </footer>
      </main>

      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          header {
            position: relative !important;
            border-bottom: 1px solid #e5e5e5;
          }

          nav {
            display: none !important;
          }

          .container {
            max-width: 100%;
          }

          section {
            page-break-inside: avoid;
          }

          h1, h2, h3 {
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
}
