import { Document, Packer, Paragraph, TextRun, BorderStyle, AlignmentType, HeadingLevel, convertInchesToTwip } from 'docx';
import { Resume } from '../types/resume';
import { saveAs } from 'file-saver';

export class WordDocumentGenerator {
  private static readonly HEADER_COLOR = '1F4788';
  private static readonly ACCENT_COLOR = '2E5C8A';

  private static createSectionHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      border: {
        bottom: {
          color: this.HEADER_COLOR,
          space: 1,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      spacing: { before: 200, after: 100 },
      shading: { fill: 'F0F4F8' },
    });
  }

  private static createContactSection(resume: Resume): Paragraph[] {
    const { contact } = resume;
    const details: string[] = [];
    if (contact.email) details.push(contact.email);
    if (contact.phone) details.push(contact.phone);
    if (contact.location) details.push(contact.location);
    if (contact.linkedIn) details.push(`LinkedIn: ${contact.linkedIn}`);
    if (contact.portfolio) details.push(`Portfolio: ${contact.portfolio}`);

    return [
      new Paragraph({
        children: [
          new TextRun({
            text: contact.fullName,
            bold: true,
            size: 28,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 50 },
      }),
      new Paragraph({
        text: details.join(' | '),
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
    ];
  }

  private static createSummarySection(resume: Resume): Paragraph[] {
    return [
      this.createSectionHeading('PROFESSIONAL SUMMARY'),
      new Paragraph({
        text: resume.professional_summary,
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED,
      }),
    ];
  }

  private static createExperienceSection(resume: Resume): Paragraph[] {
    const paragraphs: Paragraph[] = [this.createSectionHeading('PROFESSIONAL EXPERIENCE')];

    resume.experience.forEach((exp, index) => {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.jobTitle,
              bold: true,
              size: 24,
              color: this.ACCENT_COLOR,
            }),
          ],
          spacing: { before: index > 0 ? 150 : 0, after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.company} | ${exp.location} | ${exp.startDate} - ${
                exp.isCurrentRole ? 'Present' : exp.endDate
              }`,
              italics: true,
              size: 20,
              color: '666666',
            }),
          ],
          spacing: { after: 100 },
        })
      );

      exp.description.forEach(desc => {
        paragraphs.push(
          new Paragraph({
            text: desc,
            spacing: { after: 50 },
            bullet: { level: 0 },
          })
        );
      });
    });

    return paragraphs;
  }

  private static createEducationSection(resume: Resume): Paragraph[] {
    const paragraphs: Paragraph[] = [this.createSectionHeading('EDUCATION')];

    resume.education.forEach((edu, index) => {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 24,
              color: this.ACCENT_COLOR,
            }),
          ],
          spacing: { before: index > 0 ? 100 : 0, after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.institution} | ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
              italics: true,
              size: 20,
              color: '666666',
            }),
          ],
          spacing: { after: 100 },
        })
      );

      if (edu.details) {
        paragraphs.push(
          new Paragraph({
            text: edu.details,
            spacing: { after: 150 },
          })
        );
      }
    });

    return paragraphs;
  }

  private static createSkillsSection(resume: Resume): Paragraph[] {
    const paragraphs: Paragraph[] = [this.createSectionHeading('SKILLS')];

    resume.skills.forEach((skillGroup, index) => {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${skillGroup.category}:`,
              bold: true,
            }),
          ],
          spacing: { before: index > 0 ? 100 : 0, after: 50 },
        }),
        new Paragraph({
          text: skillGroup.skills.join(' • '),
          spacing: { after: 100 },
        })
      );
    });

    return paragraphs;
  }

  private static createProjectsSection(resume: Resume): Paragraph[] {
    if (!resume.projects || resume.projects.length === 0) {
      return [];
    }

    const paragraphs: Paragraph[] = [this.createSectionHeading('PROJECTS')];

    resume.projects.forEach((project, index) => {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.title,
              bold: true,
              size: 24,
              color: this.ACCENT_COLOR,
            }),
          ],
          spacing: { before: index > 0 ? 100 : 0, after: 50 },
        }),
        new Paragraph({
          text: project.description,
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Technologies: ${project.technologies.join(', ')}`,
              italics: true,
              color: '666666',
            }),
          ],
          spacing: { after: 100 },
        })
      );

      if (project.link) {
        paragraphs.push(
          new Paragraph({
            text: project.link,
            spacing: { after: 100 },
            decoration: {
              underline: {},
            },
          })
        );
      }
    });

    return paragraphs;
  }

  private static createCertificationsSection(resume: Resume): Paragraph[] {
    if (!resume.certifications || resume.certifications.length === 0) {
      return [];
    }

    const paragraphs: Paragraph[] = [this.createSectionHeading('CERTIFICATIONS')];

    resume.certifications.forEach(cert => {
      paragraphs.push(
        new Paragraph({
          text: cert,
          spacing: { after: 50 },
          bullet: { level: 0 },
        })
      );
    });

    return paragraphs;
  }

  static async generateAndDownloadResume(
    resume: Resume,
    filename: string = 'Resume.docx'
  ): Promise<void> {
    const sections: Paragraph[] = [
      ...this.createContactSection(resume),
      ...this.createSummarySection(resume),
      ...this.createExperienceSection(resume),
      ...this.createEducationSection(resume),
      ...this.createSkillsSection(resume),
      ...this.createProjectsSection(resume),
      ...this.createCertificationsSection(resume),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.75),
                right: convertInchesToTwip(0.75),
                bottom: convertInchesToTwip(0.75),
                left: convertInchesToTwip(0.75),
              },
            },
          },
          children: sections,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  }

  static async generateResumeBlob(resume: Resume): Promise<Blob> {
    const sections: Paragraph[] = [
      ...this.createContactSection(resume),
      ...this.createSummarySection(resume),
      ...this.createExperienceSection(resume),
      ...this.createEducationSection(resume),
      ...this.createSkillsSection(resume),
      ...this.createProjectsSection(resume),
      ...this.createCertificationsSection(resume),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.75),
                right: convertInchesToTwip(0.75),
                bottom: convertInchesToTwip(0.75),
                left: convertInchesToTwip(0.75),
              },
            },
          },
          children: sections,
        },
      ],
    });

    return await Packer.toBlob(doc);
  }
}
