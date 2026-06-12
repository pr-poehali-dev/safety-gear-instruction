import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HELMET_IMG = "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/90856bcc-eab6-4445-b858-0407d3b43d1a.jpg";
const WORKER_IMG = "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/0015ffc8-a36e-4f9f-a328-56faefc75e77.jpg";

const steps = [
  {
    id: 1,
    title: "Осмотрите каску",
    image: "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/1aa89fe6-8bfb-4dbd-afae-04af17f9293e.jpg",
    icon: "Search",
    color: "#F5C518",
    description: "Согласно ГОСТ EN 397-2020, перед каждым использованием необходимо провести визуальный осмотр каски. Корпус, подвесная система и потовый обод должны быть без видимых повреждений.",
    details: [
      "Осмотрите корпус: недопустимы трещины, сколы, вмятины и обесцвечивание",
      "Проверьте подвесную систему: все ленты, несущий оголовок и узлы крепления должны быть целы",
      "Убедитесь в отсутствии хрупкости и меления материала — признак старения",
      "Проверьте маркировку: должны быть читаемы имя производителя, год и квартал выпуска, размер (51–62 см), обозначение ГОСТ EN 397",
    ],
    warning: "Каска, получившая удар, подлежит обязательной замене — даже при отсутствии видимых повреждений. Максимальный срок эксплуатации — 3 года с даты выпуска (или по указанию производителя).",
    emoji: "🔍",
  },
  {
    id: 2,
    title: "Отрегулируйте подвесную систему",
    image: "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/51210b15-a7da-48e5-89fe-5b587ee0d352.jpg",
    icon: "Settings2",
    color: "#FF6B35",
    description: "ГОСТ EN 397-2020 устанавливает обязательный вертикальный зазор между теменем головы и корпусом каски не менее 25 мм. Подвесная система должна равномерно распределять нагрузку.",
    details: [
      "Отрегулируйте несущий оголовок по обхвату головы (диапазон регулировки — не менее 50 мм)",
      "Убедитесь, что вертикальный зазор между теменем и корпусом составляет не менее 25 мм",
      "Ленты подвески должны натянуты равномерно без перекосов",
      "Потовый обод (если предусмотрен) должен плотно, но комфортно прилегать ко лбу",
    ],
    warning: "Запрещено самостоятельно модифицировать, досверливать или изменять подвесную систему — это нарушает сертификацию по ГОСТ EN 397.",
    emoji: "⚙️",
  },
  {
    id: 3,
    title: "Наденьте каску",
    image: "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/9c790cdc-da5c-46a8-b679-42e0aef85dd9.jpg",
    icon: "ArrowDown",
    color: "#4CAF50",
    description: "Каска надевается горизонтально, козырьком строго вперёд. ГОСТ EN 397-2020 допускает разворот козырька назад только для касок с соответствующей маркировкой производителя.",
    details: [
      "Возьмите каску двумя руками за боковые края корпуса",
      "Наденьте плавным движением сверху вниз, не перекашивая",
      "Козырёк должен быть направлен вперёд — в сторону обзора",
      "Каска должна сидеть горизонтально, не заваливаться на затылок или лоб",
    ],
    warning: "По ГОСТ EN 397 разворот козырька назад или набок запрещён, если на каске отсутствует специальная маркировка производителя, разрешающая такое ношение.",
    emoji: "⛑️",
  },
  {
    id: 4,
    title: "Зафиксируйте подбородочный ремень",
    image: "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/bca339d2-63b0-4bd3-8a17-c617b1c8068c.jpg",
    icon: "Link",
    color: "#2196F3",
    description: "Подбородочный ремень (при наличии) обеспечивает удержание каски при опрокидывании и боковых ударах. ГОСТ EN 397-2020 устанавливает требования к его прочности — усилие разрыва не менее 150 Н и не более 250 Н.",
    details: [
      "Пропустите ремень под подбородком и застегните пряжку",
      "Отрегулируйте длину: между ремнём и подбородком должен проходить один палец",
      "Проверьте симметричность натяжения с обеих сторон",
      "Убедитесь, что пряжка не давит на кожу и не мешает речи",
    ],
    warning: "Ремень не должен затягиваться туго: по ГОСТ EN 397 усилие удержания — 150–250 Н. Чрезмерное натяжение создаёт травмоопасность при рывке.",
    emoji: "🔗",
  },
  {
    id: 5,
    title: "Проверьте правильность посадки",
    image: "https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/files/9df07740-b9e9-4eae-9ac8-72ee6e73095d.jpg",
    icon: "CheckCircle",
    color: "#9C27B0",
    description: "Финальная проверка по требованиям ГОСТ EN 397-2020: каска должна устойчиво держаться на голове, не ограничивать обзор и не оказывать давления на голову.",
    details: [
      "Наклоните и покачайте головой — каска не должна смещаться",
      "Проверьте, что вертикальный зазор 25 мм между теменем и корпусом сохранён",
      "Убедитесь, что поле зрения не ограничено краями козырька (козырёк — не более 50 мм по ГОСТ EN 397)",
      "Каска не должна давить на лоб, виски или затылок — равномерное распределение нагрузки",
    ],
    warning: "Если каска не сидит устойчиво или вызывает дискомфорт — замените на подходящий размер. Не используйте под каской шапки или другие предметы, не предусмотренные производителем.",
    emoji: "✅",
  },
];

const facts = [
  { icon: "Shield", text: "Поглощение удара: остаточная сила не более 5 кН при испытании по ГОСТ EN 397" },
  { icon: "Clock", text: "Срок эксплуатации — не более 3 лет с даты выпуска (маркировка: год и квартал)" },
  { icon: "Thermometer", text: "Базовый диапазон: −10°C…+50°C. Маркировка «LT» — до −20°C, «HT» — кратковременно до +150°C" },
  { icon: "Zap", text: "Электрозащита класса «440 V AC»: выдерживает пробивное напряжение 1000 В переменного тока" },
];

export default function Index() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleStep = (id: number) => {
    setActiveStep(activeStep === id ? null : id);
  };

  const markComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const scrollToSteps = () => {
    stepsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const allDone = completedSteps.length === steps.length;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center grid-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(45 100% 52%) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 90% 55%) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
          <div className={`flex-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-sm font-medium tracking-wide uppercase">Средства индивидуальной защиты</span>
            </div>

            <h1 className="font-heading text-6xl lg:text-8xl font-bold leading-none mb-6 uppercase tracking-tight">
              <span className="block text-foreground">Как правильно</span>
              <span className="block text-neon text-glow">надеть каску</span>
            </h1>

            <p className="text-muted-foreground text-xl leading-relaxed mb-10 max-w-lg">
              Пошаговая интерактивная инструкция. Следуй каждому шагу — твоя безопасность зависит от правильного надевания.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToSteps}
                className="group flex items-center gap-3 px-8 py-4 bg-neon text-background font-heading font-semibold text-lg uppercase tracking-wide rounded-xl glow-neon hover:scale-105 transition-all duration-200"
              >
                Начать инструкцию
                <Icon name="ArrowDown" size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 px-6 py-4 border border-border rounded-xl text-muted-foreground">
                <Icon name="Clock" size={18} className="text-neon" />
                <span>5 шагов · 3 минуты</span>
              </div>
            </div>
          </div>

          <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border border-yellow-500/20 animate-float"
                style={{ boxShadow: "0 0 60px hsl(45 100% 52% / 0.2), 0 0 120px hsl(45 100% 52% / 0.08)" }}>
                <img src={HELMET_IMG} alt="Защитная каска" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-5 py-3 flex items-center gap-3">
                <span className="text-2xl">⛑️</span>
                <div>
                  <div className="text-xs text-muted-foreground">Стандарт</div>
                  <div className="font-heading font-semibold text-foreground text-sm">ГОСТ EN 397-2020</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-500 text-background rounded-2xl px-4 py-2 font-heading font-bold text-sm uppercase">
                5 шагов
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-sm animate-bounce">
          <span>Прокрути вниз</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* Progress bar */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
            Выполнено: {completedSteps.length}/{steps.length}
          </span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-neon rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
          {allDone && (
            <span className="text-yellow-400 text-sm font-medium flex items-center gap-1">
              <Icon name="CheckCircle" size={16} />
              Готово!
            </span>
          )}
        </div>
      </div>

      {/* Steps */}
      <section ref={stepsRef} className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl font-bold uppercase tracking-tight mb-4">
            Пошаговая <span className="text-neon">инструкция</span>
          </h2>
          <p className="text-muted-foreground text-lg">Нажмите на каждый шаг, чтобы развернуть подробности</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isDone = completedSteps.includes(step.id);
            return (
              <div
                key={step.id}
                className={`relative rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "border-yellow-500/50 bg-card"
                    : isDone
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-border bg-card hover:border-yellow-500/30"
                }`}
                style={{ boxShadow: isActive ? `0 0 30px ${step.color}25` : undefined }}
                onClick={() => toggleStep(step.id)}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                  style={{ backgroundColor: isActive || isDone ? step.color : "transparent" }}
                />

                <div className="flex items-center gap-5 p-6 pl-8">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-bold text-xl transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? step.color : isDone ? "#4CAF50" : "hsl(20 12% 15%)",
                      color: isActive || isDone ? "#111" : step.color,
                    }}
                  >
                    {isDone ? <Icon name="Check" size={22} /> : step.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    {!isActive && (
                      <p className="text-muted-foreground text-sm line-clamp-1">{step.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    {isDone && !isActive && (
                      <span className="text-green-400 text-sm hidden sm:flex items-center gap-1">
                        <Icon name="CheckCircle" size={16} />
                        Выполнено
                      </span>
                    )}
                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{ borderColor: isActive ? step.color : "hsl(20 12% 25%)" }}
                    >
                      <Icon
                        name={isActive ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        style={{ color: isActive ? step.color : "hsl(40 10% 60%)" }}
                      />
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="px-8 pb-8">
                    <div className="ml-0 sm:ml-[76px]">
                      {/* Image + description row */}
                      <div className="flex flex-col sm:flex-row gap-6 mb-6">
                        <div className="flex-shrink-0">
                          <div
                            className="w-full sm:w-52 h-40 rounded-2xl overflow-hidden border"
                            style={{ borderColor: step.color + "40", boxShadow: `0 0 20px ${step.color}20` }}
                          >
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <p className="text-foreground/90 text-base leading-relaxed">{step.description}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-4">Что делать:</h4>
                          <ul className="space-y-3">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                <div
                                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-xs font-bold"
                                  style={{ backgroundColor: step.color + "33", color: step.color }}
                                >
                                  {i + 1}
                                </div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-5">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon name="AlertTriangle" size={18} className="text-orange-400 flex-shrink-0" />
                              <span className="font-heading text-sm uppercase tracking-widest text-orange-400">Важно</span>
                            </div>
                            <p className="text-foreground/80 text-sm leading-relaxed">{step.warning}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => markComplete(step.id, e)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:scale-105"
                        style={
                          isDone
                            ? { backgroundColor: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", color: "#4ade80" }
                            : { backgroundColor: step.color, color: "#111" }
                        }
                      >
                        <Icon name={isDone ? "X" : "Check"} size={16} />
                        {isDone ? "Отметить как невыполненное" : "Шаг выполнен!"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allDone && (
          <div className="mt-12 rounded-3xl border border-yellow-500/40 bg-yellow-500/10 p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-heading text-4xl font-bold uppercase text-neon mb-3">Отлично!</h3>
            <p className="text-foreground/80 text-lg">Все шаги выполнены. Каска надета правильно — вы защищены!</p>
          </div>
        )}
      </section>

      {/* Video */}
      <section className="border-t border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6">
              <Icon name="Play" size={16} className="text-neon" />
              <span className="text-yellow-400 text-sm font-medium uppercase tracking-wide">Видеоинструкция</span>
            </div>
            <h2 className="font-heading text-5xl font-bold uppercase tracking-tight">
              Смотрите <span className="text-neon">в действии</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
              Наглядная демонстрация правильного надевания и выбора защитной каски
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden border border-yellow-500/20"
              style={{ boxShadow: "0 0 60px hsl(45 100% 52% / 0.15), 0 0 120px hsl(45 100% 52% / 0.06)" }}
            >
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/AOIRUg06ShQ?start=6&rel=0&modestbranding=1"
                  title="Видеоинструкция по надеванию защитной каски"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-card border border-border rounded-xl px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Youtube" size={16} className="text-red-500" />
              YouTube
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-t border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-center mb-12">
            Знаете ли <span className="text-neon">вы?</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((fact, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 hover:border-yellow-500/40 hover:bg-yellow-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <Icon name={fact.icon} size={22} className="text-neon" />
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Result photo */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-6">
                <Icon name="CheckCircle" size={16} className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">Правильный результат</span>
              </div>
              <h2 className="font-heading text-5xl font-bold uppercase tracking-tight mb-6">
                Так должна <span className="text-neon">выглядеть</span> правильно надетая каска
              </h2>
              <ul className="space-y-4">
                {[
                  "Козырёк направлен строго вперёд (ГОСТ EN 397-2020, п. 6.3)",
                  "Вертикальный зазор между теменем и корпусом — не менее 25 мм",
                  "Подвесная система отрегулирована, ленты без перекосов",
                  "Подбородочный ремень застёгнут и отрегулирован (150–250 Н)",
                  "Каска не смещается при наклонах и покачивании головой",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-neon" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="w-80 h-80 rounded-3xl overflow-hidden border border-yellow-500/20"
                style={{ boxShadow: "0 0 60px hsl(45 100% 52% / 0.15)" }}>
                <img src={WORKER_IMG} alt="Правильно надетая каска" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <img
            src="https://cdn.poehali.dev/projects/2a49e466-0694-47af-bb09-b432e50f4b6e/bucket/12e5a04d-b0e8-42fd-b141-1ceed826e332.png"
            alt="СурГУ"
            className="h-12 object-contain brightness-0 invert opacity-80"
          />
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-muted-foreground text-sm text-center">
              Инструкция разработана в соответствии с ГОСТ EN 397-2020 «Каски защитные промышленные»
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Котов И.Т · Группа 305-21
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}