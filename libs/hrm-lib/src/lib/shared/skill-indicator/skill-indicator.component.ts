import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MASTERY_MAP, MasteryLevel } from './skill-indicator.constants';

@Component({
  selector: 'lib-skill-indicator',
  imports: [],
  templateUrl: './skill-indicator.component.html',
  styleUrl: './skill-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillIndicatorComponent {
  label = input.required<string>();
  mastery = input.required<MasteryLevel | string>();

  masterySettings = computed(() => {
    const level = this.mastery() as MasteryLevel;
    return MASTERY_MAP[level] ?? { width: '0%', color: 'transparent' };
  });
}
