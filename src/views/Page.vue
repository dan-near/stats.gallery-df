<template>
  <CombinedTopBar :showIntake="true" />
  <div class="p-3 mx-auto max-w-7xl flex flex-col">
    <header
      class="
        lg:ml-64
        xl:ml-80
        flex-grow flex flex-wrap
        mt-8
        lg:mt-4
        mb-4
        lg:mb-2
        space-y-4
        lg:space-y-1
      "
    >
      <h1
        class="
          order-1
          font-display font-extrabold
          text-4xl
          truncate
          md:text-5xl
          my-1
          mr-3
          lg:flex-grow
        "
      >
        {{ account }}
      </h1>

      <div class="sr-only">Metrics</div>
      <div class="order-3 self-center flex space-x-3">
        <Star class="text-blue-500">{{
          $filters.number.standard(accountLevel.level)
        }}</Star>
        <div
          class="
            py-1
            px-4
            bg-purple-700
            rounded-full
            flex
            justify-center
            text-white
            font-bold
          "
        >
          {{ $filters.number.standard(score) }}
        </div>
        <div
          class="
            py-1
            px-4
            bg-white
            text-black
            rounded-full
            flex
            justify-center
            font-bold
          "
        >
          <near-symbol class="w-5 h-full" />&nbsp;{{
            $filters.number.standard(+$filters.toNear(view.amount))
          }}
        </div>
      </div>

      <div class="hidden lg:block order-4 w-full mt-2"></div>

      <div class="sr-only">Badges</div>
      <div
        class="order-2 lg:order-5 flex-grow flex items-center space-x-1 mr-5"
      >
        <BadgeTooltip
          v-for="badge in badgeGroups"
          :key="badge.name"
          :name="badge.name"
          :description="badge.description"
          :fraction="badge.rarityFraction"
          :group="badge.group"
        />
      </div>
    </header>

    <div class="w-full mt-5 flex">
      <nav
        class="
          w-1/5
          md:w-52
          lg:w-64
          xl:w-80
          flex-shrink-0 flex flex-col
          space-y-2
          pr-4
        "
      >
        <SectionLink to="./overview" :icon="OverviewIcon" name="Overview" />
        <SectionLink to="./stats" :icon="StatsIcon" name="Stats" />
        <SectionLink
          to="./transactions"
          :icon="TransactionsIcon"
          name="Transactions"
        />
        <SectionLink to="./quests" :icon="QuestsIcon" name="Quests" />
        <!-- <SectionLink
          to="./leaderboards"
          :icon="LeaderboardsIcon"
          name="Leaderboards"
        /> -->
        <hr class="w-64 dark:border-gray-700 hidden md:block" />
        <SectionLink
          to="https://learnnear.club/"
          :icon="AcademicCapIcon"
          name="Learn NEAR"
          external
        />
        <SectionLink
          to="https://near-in-minutes.com/"
          :icon="ClockIcon"
          name="NEAR in Minutes"
          external
        />
        <SectionLink
          to="https://paras.id/"
          :icon="NftIcon"
          name="Buy NFTs"
          external
        />
        <div class="flex-grow"></div>
        <div class="hidden md:block">
          <div
            class="
              p-3
              border-gray-300
              dark:border-gray-700
              border-2 border-dashed
              rounded-md
              flex flex-wrap
              justify-center
              items-center
              font-medium
              text-base text-gray-400 text-center
            "
          >
            <strong>Have a suggestion?</strong>
            <p>Share your experience!</p>
            <a
              href="https://forms.gle/VsuVJsqdChBuhDdM7"
              target="_blank"
              rel="noreferrer"
              class="
                whitespace-nowrap
                m-1
                border-2 border-gray-400
                px-3
                py-1
                rounded-md
                font-medium
                flex
                items-center
                space-x-2
                hover:bg-gray-400 hover:bg-opacity-10
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-gray-500
              "
            >
              <AnnotationIcon class="w-4 h-4" />
              <span>Feedback</span>
            </a>
            <a
              href="https://github.com/NEAR-Edu/stats.gallery/issues/new/choose"
              target="_blank"
              rel="noreferrer"
              class="
                whitespace-nowrap
                m-1
                border-2 border-gray-400
                px-3
                py-1
                rounded-md
                font-medium
                flex
                items-center
                space-x-2
                hover:bg-gray-400 hover:bg-opacity-10
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-gray-500
              "
            >
              <ContactIcon class="w-4 h-4" />
              <span>Reports</span>
            </a>
          </div>
        </div>
      </nav>

      <slot />
      <router-view></router-view>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import BadgeTooltip from '@/components/badges/BadgeTooltip.vue';
import FunctionBadge from '@/components/badges/FunctionBadge.vue';
import NftBadge from '@/components/badges/NftBadge.vue';
import TransactionBadge from '@/components/badges/TransactionBadge.vue';
import Footer from '@/components/Footer.vue';
import ContactIcon from '@/components/icons/ContactIcon.vue';
import CombinedTopBar from '@/components/navigation/TopBar.vue';
import {
  BadgeGroup,
  badges,
  IBadgeDescriptor,
} from '@/composables/badges/badges';
import { useAchievedBadges } from '@/composables/badges/useAchievedBadges';
import { useAccountView } from '@/composables/useAccountView';
import { useNear } from '@/composables/useNear';
import { useScore } from '@/composables/useScore';
import {
  AcademicCapIcon,
  ClockIcon,
  AnnotationIcon,
} from 'heroicons-vue3/solid';
import { defineComponent, ref, watch } from 'vue';
import LeaderboardsIcon from './overview/icons/LeaderboardsIcon.vue';
import NftIcon from './overview/icons/NftIcon.vue';
import OverviewIcon from './overview/icons/OverviewIcon.vue';
import QuestsIcon from './overview/icons/QuestsIcon.vue';
import StatsIcon from './overview/icons/StatsIcon.vue';
import TransactionsIcon from './overview/icons/TransactionsIcon.vue';
import SectionLink from './overview/SectionLink.vue';
import Star from './overview/Star.vue';

export default defineComponent({
  components: {
    Footer,
    CombinedTopBar,
    SectionLink,
    Star,
    BadgeTooltip,
    ContactIcon,
    AnnotationIcon,
  },
  setup() {
    const { account, network, timeframe } = useNear();
    const { view } = useAccountView({
      account,
      network,
      finality: 'final',
    });
    const {
      score,
      accountLevel,
      isLoading: isScoreLoading,
    } = useScore({
      account,
      network,
      timeframe,
    });

    const { achievedBadges } = useAchievedBadges({ account, network });
    const badgeGroups = ref([] as IBadgeDescriptor[]);

    const findBestBadgeInGroup = (
      group: BadgeGroup,
      achievedBadges: Set<IBadgeDescriptor>,
    ) => {
      for (let i = badges.length - 1; i >= 0; i--) {
        const b = badges[i];
        if (b.group === group && achievedBadges.has(b)) {
          return b;
        }
      }
    };

    watch(achievedBadges, achievedBadges => {
      const nft = findBestBadgeInGroup('nft', achievedBadges) ?? [];
      const transfer = findBestBadgeInGroup('transfer', achievedBadges) ?? [];
      const contract = findBestBadgeInGroup('contract', achievedBadges) ?? [];
      const stake = findBestBadgeInGroup('stake', achievedBadges) ?? [];

      badgeGroups.value = [nft, transfer, stake, contract].flat();
    });

    return {
      account,
      view,
      score,
      accountLevel,
      badgeGroups,
      OverviewIcon,
      StatsIcon,
      TransactionsIcon,
      QuestsIcon,
      LeaderboardsIcon,
      NftIcon,
      ClockIcon,
      AcademicCapIcon,
      TransactionBadge,
      FunctionBadge,
      NftBadge,
    };
  },
});
</script>
