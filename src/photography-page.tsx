import { ContactFormWrapper } from './contact-form-wrapper';

export const PhotographyPage = () => {
  const services = [
    {
      icon: '📸',
      title: 'צילום אירועים',
      description:
        'חתונות, בר/בת מצווה, ימי הולדת ואירועים עסקיים. תיעוד שמרגיש טבעי, עם תשומת לב לרגעים הקטנים.',
    },
    {
      icon: '💞',
      title: 'משפחות וזוגות',
      description:
        'צילום באווירה נעימה ובקצב נכון: סטיילינג מינימלי, קומפוזיציה מחמיאה ותוצאות שמרגישות כמו את/ה.',
    },
    {
      icon: '🌿',
      title: 'הריון וילדים',
      description:
        'ליווי מקצועי מהפגישה הראשונה ועד הבחירה הסופית. תיעוד של גדילה, צבע ואנרגיה אמיתית.',
    },
    {
      icon: '🏢',
      title: 'תדמית לעסקים',
      description:
        'צילום לצוות, בעלי עסקים ותכנים שיווקיים. התמונות מותאמות לאתר, לאינסטגרם ולמצגות מכירה.',
    },
    {
      icon: '🎞️',
      title: 'סטודיו או טבע',
      description:
        'אפשר לשלב סגנונות: מקלאסי-נקי בסטודיו ועד טבע אורבני או טבע רחב. כל בחירה בהתאם למה שאתם רוצים להעביר.',
    },
    {
      icon: '✨',
      title: 'עריכה וקבצים דיגיטליים',
      description:
        'תהליך עריכה מקצועי, תיקוני צבע ודגשים חכמים. מסירה מסודרת של קבצים באיכות גבוהה וגלריה דיגיטלית.',
    },
  ];

  const steps = [
    {
      icon: '1️⃣',
      title: 'שיחת היכרות קצרה',
      description: 'נבין מה חשוב לכם, מה הסגנון הרצוי ומתי מתקיים האירוע/הצילום.',
    },
    {
      icon: '2️⃣',
      title: 'תכנון וסגנון',
      description:
        'בחירת לוקיישן/סטיילינג, תיאום ציפיות ולו״ז. כדי שתדעו בדיוק למה להגיע.',
    },
    {
      icon: '3️⃣',
      title: 'צילום באווירה רגועה',
      description: 'הכוונה מקצועית בלי לחץ: אתם במרכז, ואני אדאג לקומפוזיציה והרגעים.',
    },
    {
      icon: '4️⃣',
      title: 'עריכה, דירוג צבע וגלריה',
      description:
        'אבחר ואערוך בקפדנות, אשלח גלריה מסודרת ולאחר מכן נבצע התאמות לפי הצורך.',
    },
  ];

  const packages = [
    {
      icon: '🟦',
      title: 'חבילה קומפקטית',
      description: 'מתאימה לאירועים קטנים או לצילום ממוקד. חוויה קצרה ומדויקת עם עריכה מלאה.',
    },
    {
      icon: '🟣',
      title: 'חבילה מלאה (Signature)',
      description: 'כוללת זמן צילום נדיב יותר, עריכה מקצועית והתמקדות בסיפור מאוחד וברצף תמונות.',
    },
    {
      icon: '🟩',
      title: 'חבילה פרימיום',
      description: 'למי שרוצה ליווי מקיף יותר: תכנון מראש, סטיילינג, ורפרנס לתוצאות “וואו”.',
    },
  ];

  return (
    <div className="photography-page" dir="rtl">
      <section className="hero photography-hero" aria-label="Hero section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="photography-hero-title">אביטל גלזר צילום</span>
            </h1>
            <h2 className="hero-secondary-title gradient-text">צילום עם לב ודיוק</h2>
            <p className="hero-subtitle">
              צילום אירועים, משפחות וזוגות, צילומי הריון וילדים, חתונות וצילומי תדמית לעסקים. שילוב של
              יצירתיות, תשומת לב לפרטים וליווי אישי לכל אורך הדרך.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary btn-large" aria-label="קבעו שיחה">
                קבעו שיחה
              </a>
              <a
                href="#photography-services"
                className="btn-secondary btn-large"
                aria-label="למה לבחור בי"
              >
                מה השירותים
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="floating-card card-1">
              <div className="card-content">📷</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-content">💞</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-content">✨</div>
            </div>
          </div>

          <div className="hero-mobile-content fade-in-up">
            <div className="tech-stack-mobile" aria-label="תחומי צילום">
              <div className="tech-item-mobile">
                <span className="tech-icon">🎉</span>
                <span className="tech-name">אירועים</span>
              </div>
              <div className="tech-item-mobile">
                <span className="tech-icon">👫</span>
                <span className="tech-name">זוגות</span>
              </div>
              <div className="tech-item-mobile">
                <span className="tech-icon">👶</span>
                <span className="tech-name">ילדים</span>
              </div>
              <div className="tech-item-mobile">
                <span className="tech-icon">🏢</span>
                <span className="tech-name">תדמית</span>
              </div>
            </div>
            <div className="hero-stats-mobile" aria-label="הדגשים">
              <div className="stat-mobile">
                <div className="stat-number-mobile">24h</div>
                <div className="stat-label-mobile">זמינות לתשובה</div>
              </div>
              <div className="stat-mobile">
                <div className="stat-number-mobile">Pro</div>
                <div className="stat-label-mobile">עריכה קפדנית</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="photography-services" className="services" aria-labelledby="photo-services-heading">
        <div className="container">
          <h2 id="photo-services-heading" className="section-title">
            השירותים שלי
          </h2>
          <p className="section-subtitle">
            כל צילום מתחיל בהקשבה לסגנון ולציפיות שלכם, וממשיך לתוצאה איכותית עם ליווי מקצועי בכל שלב.
          </p>

          <div className="services-grid" role="list">
            {services.map((service, index) => (
              <article
                key={index}
                className="service-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="service-icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about photography-about" id="photo-process" aria-labelledby="photo-process-heading">
        <div className="container">
          <h2 id="photo-process-heading" className="section-title">
            איך זה עובד
          </h2>
          <p className="section-subtitle">תהליך ברור, אווירה רגועה ותוצאה שמרגישה מדויקת.</p>

          <div className="services-grid" role="list">
            {steps.map((step, index) => (
              <article
                key={index}
                className="service-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="service-icon" aria-hidden="true">
                  {step.icon}
                </div>
                <h3 className="service-title">{step.title}</h3>
                <p className="service-description">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services" aria-labelledby="photo-packages-heading">
        <div className="container">
          <h2 id="photo-packages-heading" className="section-title">
            חבילות מומלצות
          </h2>
          <p className="section-subtitle">
            אפשר להתאים לכל פרויקט. בחרו חבילה לפי אופי הצילום, ואז נדייק יחד דרך שיחת ההיכרות.
          </p>

          <div className="services-grid" role="list">
            {packages.map((pkg, index) => (
              <article
                key={index}
                className="service-card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="service-icon" aria-hidden="true">
                  {pkg.icon}
                </div>
                <h3 className="service-title">{pkg.title}</h3>
                <p className="service-description">{pkg.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="photography-contact-heading">
        <div className="container">
          <h2 id="photography-contact-heading" className="section-title">
            בואו נדבר על הצילום הבא שלכם
          </h2>
          <p className="section-subtitle">
            רוצים לסגור תאריך? השאירו פרטים, ואחזור אליכם בהקדם. אפשר גם לכל התייעצות לגבי סגנון או לוקיישן.
          </p>

          <div className="contact-form-container fade-in-up">
            <ContactFormWrapper />

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  💬
                </div>
                <div>
                  <h4>בואו נתחבר</h4>
                  <p>זמינה לצילומים חדשים</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

