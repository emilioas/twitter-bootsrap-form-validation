/**
 * Twitter bootstrap form validation for jQuery
 * Copyright (c) 2012 Vlad Miller (meta-labs.org)
 * Licensed under the GPL license (https://github.com/maxmara/twitter-bootsrap-form-validation)
 * Version: 1.0.0
 */

;
(function($) {
    var validators = {
        'string':  /^[\w\d\s]*$/i,
        'integer': /^[\d]*$/i,
        'email':   /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
    }

    function notify($object, validator, type) {
        var $error = $object.attr(validator + ':' + type) !== undefined ? $object.attr(validator + ':' + type) : $object.attr(type);
        $object.next('.input-status').html($error);
        $object.parents('.control-group').addClass(type);

        switch (type) {
            case 'error': {
                return 0;
            }
            case 'warning': {
                return 1;
            }
            case 'sucess': {
                return 2;
            }

        }

    }

    $.fn.validate = function() {
        var self  = $(this);
        var valid = 2;

        $('input,select,textarea', self).each(function() {
            var $input   = $(this);
            var $pattern = $input.attr('validate');
            var $value   = $input.val();

            $input.next('.input-status').html('');
            $input.parents('.control-group')
                    .removeClass('error')
                    .removeClass('warning');

            if ($pattern !== undefined) {
                $pattern = $pattern.split(' ');

                for (var i in $pattern) {
                    var $piece = $pattern[i].split(':');
                    var $validator = $piece[0];
                    var $type      = $piece[1];

                    switch ($validator) {
                        case 'string': {
                            if (!validators[$validator].test($value)) {
                                var level = notify($input, $validator, $type);
                                if (level == 2 && valid > 1) {
                                    valid = 2;
                                }
                                if (level == 1 && valid > 0) {
                                    valid = 1;
                                }
                                if (level == 0) {
                                    valid = 0;
                                }
                            }
                            break;
                        }
                        case 'integer': {
                            if (!validators[$validator].test($value)) {
                                var level = notify($input, $validator, $type);
                                if (level == 2 && valid > 1) {
                                    valid = 2;
                                }
                                if (level == 1 && valid > 0) {
                                    valid = 1;
                                }
                                if (level == 0) {
                                    valid = 0;
                                }
                            }
                            break;
                        }
                        case 'notEmpty': {
                            if ($value === undefined || $value == '') {
                                var level = notify($input, $validator, $type);
                                if (level == 2 && valid > 1) {
                                    valid = 2;
                                }
                                if (level == 1 && valid > 0) {
                                    valid = 1;
                                }
                                if (level == 0) {
                                    valid = 0;
                                }
                            }
                            break;
                        }
                        case 'email': {
                            if (!validators[$validator].test($value)) {
                                var level = notify($input, $validator, $type);
                                if (level == 2 && valid > 1) {
                                    valid = 2;
                                }
                                if (level == 1 && valid > 0) {
                                    valid = 1;
                                }
                                if (level == 0) {
                                    valid = 0;
                                }
                            }
                            break;
                        }
                        default: {
                            var regex = RegExp($validator, 'i');
                            if (!regex.test($value)) {
                                var level = notify($input, $validator, $type);
                                    if (level == 0) {
                                        valid = 0;
                                    }
                                    if (level == 1 && valid > 0) {
                                        valid = 1;
                                    }
                                    if (level == 2 && valid > 1) {
                                        valid = 2;
                                    }
                            }
                            break;
                        }
                    }
                }

            }

        });

        return valid;
    };
})(jQuery);