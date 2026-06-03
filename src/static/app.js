const BUILD_VERSION = '__GITHUB_SHA__';

window.notasApp = function notasApp() {
  const TP_COUNT = 15;

  return {
    loading: true,
    error: null,
    loggedIn: false,
    user: null,
    grades: null,

    get trabajosPracticos() {
      if (!this.grades) return [];

      const rows = [];
      for (let i = 1; i <= TP_COUNT; i++) {
        const notaKey = `nota-tp${i}`;
        const comentarioKey = `comentario-tp${i}`;

        if (this.grades[notaKey]) {
          rows.push({
            id: i,
            trabajo: `TP ${i}`,
            resultado: this.grades[notaKey],
            comentarios: this.grades[comentarioKey] || '',
          });
        }
      }
      return rows;
    },

    get gradesCards() {
      const gradesCards = [];
      const cardsConfig = {
        '1er Cuatrimestre': {
          Informe: '1c-informe',
          Nota: '1c-nota',
          Presentismo: '1c-presentismo',
        },
        '2do Cuatrimestre': {
          Informe: '2c-informe',
          Nota: '2c-nota',
          Presentismo: '2c-presentismo',
        },
        Intensificación: {
          '1ra Instancia': 'intensifica-1',
          '2da Instancia': 'intensifica-2',
          Final: 'intensifica-nota',
        },
        Final: {
          Nota: 'final-nota',
          Presentismo: 'final-presentismo',
        },
      };

      Object.entries(cardsConfig).forEach(([cardTitle, rows]) => {
        const items = Object.entries(rows).map(([label, key]) => ({
          label,
          value: this.grades[key] || '-',
        }));

        const disabled = items.every((item) => item.value === '-');

        gradesCards.push({
          title: cardTitle,
          items,
          disabled,
        });
      });

      return gradesCards;
    },

    async init() {
      await this.checkAuth();

      if (this.loggedIn) {
        await this.fetchGrades();
      }

      this.loading = false;
      this.renderVersionLink();
    },

    async checkAuth() {
      const res = await fetch('/auth/github/user');

      if (!res.ok) {
        this.loggedIn = false;
        return;
      }

      this.user = await res.json();
      this.loggedIn = true;
    },

    async fetchGrades() {
      this.error = null;
      const res = await fetch('/api/grades');

      if (res.status === 401) {
        this.loggedIn = false;
        return;
      }

      if (res.status === 404) {
        this.error = `No se encontraron datos para el usuario ${this.user.username}.`;
        return;
      }

      if (!res.ok) {
        this.error = 'Error al obtener datos.';
        return;
      }

      this.grades = await res.json();
    },

    async logout() {
      await fetch('/auth/github/logout', { method: 'POST' });
      location.reload();
    },

    renderVersionLink() {
      const versionLink = document.getElementById('versionLink');

      if (!versionLink || BUILD_VERSION === 'dev') {
        return;
      }

      versionLink.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://github.com/tehuel/notas.tehuel.com.ar/commit/${BUILD_VERSION}" class="text-white">${BUILD_VERSION.substring(0, 7)}</a>`;
    },
  };
};
