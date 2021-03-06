// SPDX-License-Identifier: MIT
// Copyright (c) 2020 The Pybricks Authors

import { lookup } from '../../test';
import { TooltipId } from './button-i18n';
import en from './button-i18n.en.json';

describe('Ensure .json file has matches for TooltipIds', () => {
    test.each(Object.values(TooltipId))('%s', (id) => {
        expect(lookup(en, id)).toBeDefined();
    });
});
