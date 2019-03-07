import inquirer from 'inquirer';
import { replaceIcu, reInsertIcu } from '../icu';
import { TranslationService } from '.';
import languages from '../languages';

export class ManualTranslation implements TranslationService {
  public name = 'Manual Translation';

  initialize() {}

  async getAvailableLanguages() {
    return languages;
  }

  async translateStrings(
    strings: { key: string; value: string }[],
    from: string,
    to: string,
  ) {
    const results: { key: string; value: string; translated: string }[] = [];

    if (strings.length === 0) {
      return [];
    }

    console.log();
    console.log(`├─┌── Translatable strings:`);

    for (const { key, value } of strings) {
      const { replacements } = replaceIcu(value);
      process.stdout.write('│ ├── ');

      const result = await inquirer.prompt<{ result: string }>([
        {
          name: 'result',
          message: `[${from} -> ${to}] ${
            key !== value ? `(${key}) ` : ''
          }${value}:`,
        },
      ]);

      results.push({
        key,
        value,
        translated: reInsertIcu(result.result, replacements),
      });
    }

    process.stdout.write(`│ └── Done`);

    return results;
  }
}
