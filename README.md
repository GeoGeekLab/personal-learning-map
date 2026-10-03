# Personal Learning Map

**A research-oriented capability architecture for lifelong learning.**

[Open the interactive map →](https://geogeeklab.github.io/personal-learning-map/)

## About

**Personal Learning Map** is an independent research and design project by **GeoGeekLab**. It turns long-horizon personal development into a navigable capability system: what to learn, how deeply to learn it, how to test transfer, and where high-quality open learning paths begin.

The project treats lifelong learning as an architecture problem rather than a reading-list problem. Its structure separates:

- **capability domains** — what a person should be able to do;
- **knowledge modules** — the fields that supply concepts and models;
- **development depth** — Orient → Learn → Practice → Apply → Create;
- **evidence of capability** — observable work, decisions, performance, feedback, and transfer;
- **learning resources** — courses, books, exercises, projects, mentors, and communities.

```text
institutions + research
        ↓
capability model
        ↓
learning paths
        ↓
practice + projects
        ↓
feedback + transfer
        ↓
long-term capability
```

## Reference base

The map is benchmarked against public frameworks, curricula, and research from institutions including:

| Institution / source | Primary contribution to the map |
| --- | --- |
| **World Economic Forum** | Employer-reported skill demand and emerging capability trends |
| **OECD Learning Compass 2030** | Agency, well-being, responsibility, transformative competencies |
| **UNESCO** | Human-centred AI competency, ethics, application, system design |
| **Stanford University** | Breadth of reasoning, scientific inquiry, ethics, social analysis, creative expression |
| **Harvard University** | General education, quantitative reasoning, disciplinary breadth |
| **MIT** | Mathematics, science, engineering depth, communication, HASS, physical education |
| **Minerva University** | Transferable thinking, communication, interaction, applied capstone work |
| **Stanford d.school** | Design abilities, ambiguity, experimentation, prototyping and user-centred creation |
| **Learning-science literature** | Retrieval practice, spacing, feedback, transfer and deliberate practice |

The external frameworks serve different purposes. The site preserves those purposes and uses their overlap to organize a practical lifelong-learning architecture.

## Architecture

The current map uses ten capability domains:

1. Physical and psychological capacity
2. Self-directed learning and metacognition
3. Quantitative, evidential and scientific reasoning
4. Systems, complexity and decision-making
5. Creativity, design and experimentation
6. Communication, collaboration and leadership
7. Digital, computational and AI capability
8. Humanities, ethics, citizenship and civilizational understanding
9. Professional depth and value creation
10. Life stewardship and long-term responsibility

Environmental sustainability is treated as a **cross-cutting dimension** across world models, engineering decisions, resource and energy literacy, lifestyle choices, and long-term risk.

## Learning-depth model

```text
Orient → Learn → Practice → Apply → Create
```

| Stage | Evidence |
| --- | --- |
| **Orient** | Can define the field, standards, core questions and common errors |
| **Learn** | Can explain and use the foundational concepts and methods |
| **Practice** | Can perform reliably through exercises, simulations, writing or experiments |
| **Apply** | Can use the capability in real work, decisions, relationships or projects |
| **Create** | Can solve open problems, produce original work, teach or lead others |

## Design principles

**One deep well, multiple strong beams.** Broad capability supports judgment and adaptability; professional depth produces high-value work.

**Stable Core / Living Edge.** Durable principles, models and methods are separated from fast-changing tools and technology stacks.

**Evidence over completion.** Courses and books are inputs. Capability is demonstrated through performance, projects, decisions, transfer and external feedback.

**Open entry points.** The map prioritizes high-quality resources that can be accessed without institutional enrollment, including Harvard CS50, MIT OpenCourseWare, Open Yale Courses, Stanford d.school and other public learning infrastructure.

**Transfer by design.** Reasoning, communication and decision skills are trained inside multiple real contexts rather than treated as isolated subjects.

## Interface

The site is a bilingual interactive research map with:

- 中文 / English views;
- a floating section index;
- three Lieflat-derived color systems: **Palm · 椰林绿**, **Porcelain · 青瓷蓝**, and **Wire · 编辑部红**;
- institutional benchmark matrices;
- a 14-module audit;
- capability-depth mapping;
- open learning entry points;
- learning-method and source sections.

## Run locally

No build system is required.

```bash
git clone https://github.com/GeoGeekLab/personal-learning-map.git
cd personal-learning-map
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Repository layout

```text
.
├── index.html            # compatibility-safe site entrypoint
├── assets/
│   └── raw.part*.txt     # exact ordered payload of the interactive report
└── README.md             # research-project overview
```

The public site is served from the `gh-pages` branch. The branch mirrors the tested state of `main`.

## Primary public references

- WEF — Future of Jobs Report 2025: https://www.weforum.org/publications/the-future-of-jobs-report-2025/
- OECD — Learning Compass 2030: https://www.oecd.org/en/data/tools/oecd-learning-compass-2030.html
- UNESCO — AI Competency Framework for Students: https://www.unesco.org/en/articles/ai-competency-framework-students
- Stanford — Ways of Thinking / Ways of Doing: https://ways.stanford.edu/
- Harvard — General Education: https://gened.college.harvard.edu/
- MIT — General Institute Requirements: https://catalog.mit.edu/mit/undergraduate-education/general-institute-requirements/
- Minerva — Four-Year Curriculum: https://www.minerva.edu/four-year-curriculum/
- Stanford d.school — Design Abilities: https://dschool.stanford.edu/tools/design-abilities-workshop

## Status

The map is maintained as a living research artifact. Institutional frameworks, open resources and technology-specific learning paths can evolve; the capability architecture is revised when the underlying evidence or use case changes.

---

**GeoGeekLab** · build maps for complicated things.