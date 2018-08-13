;
(function() {
    "use strict";

    var _extends = Object.assign ||
        function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
            return typeof obj;
        } :
        function(obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }


    var getSettings = function(opts) {
        var defaults = {
            targetElement: '',
        };
        return _extends({}, defaults, opts);
    };

    var Calendar = function Calendar(settings) {
        this._settings = getSettings(settings);
        this._init();
    }

    // var inputValue;
    Calendar.prototype = {
        constructor: Calendar,
        _init: function() {
            var _this = this;
            var settings = this._settings;
            this.container = document.createElement('div');
            this.container.onselect = function() {
                return false;
            };
            this.container.className = this.container.className ? this.container.className += ' container' : 'container';
            this.dateInput = document.createElement('input');
            this.dateInput.setAttribute('type', 'text');
            this.dateInput.className = this.dateInput.className ? this.dateInput.className += ' date-input' : 'date-input';
            //this.dateInput.readOnly = true;
            this.datePicker = document.createElement('div');
            this.datePicker.className = this.datePicker.className ? this.datePicker.className += ' date-picker' : 'date-picker';
            this.dateBar = document.createElement('div');
            this.dateBar.className = this.dateBar.className ? this.dateBar.className += ' date-bar' : 'date-bar';
            this.dateBox = document.createElement('div');
            this.dateBox.className = this.dateBox.className ? this.dateBox.className += ' date-box' : 'date-box';
            this.icon = document.createElement('i');
            this.icon.className = this.icon.className ? this.icon.className += ' date-icon' : 'date-icon';
            this.icon.innerHTML = '';
            this.dateInput.addEventListener('click', function(e) {
                e = window.event || e;
                _this.showCalendar(e);
            });
            this.container.onblur = function() {
                    _this.datePicker.style.display = 'none';
                }
                // this.dateInput.addEventListener('onporpertychange', function(e) {
                //     inputValue = this.value;
                //     console.log('change');
                //     console.log('onporpertychange:', inputValue);
                // })
            document.onkeydown = function(e) {
                var e = e || window.event;
                var keyCode = e.charCode || e.keyCode;
                if (keyCode === 13) {
                    _this.setInput();
                }
            }
            this.datePicker.appendChild(this.dateBar);
            this.datePicker.appendChild(this.dateBox);
            this.container.appendChild(this.dateInput);
            this.container.appendChild(this.icon);
            this.container.appendChild(this.datePicker);
            this._settings.targetElement.append(this.container);

        },
        toggleDateBar: function(ele) {
            var _this = this;
            var now = new Date();
            ele.date = now;
            var year = now.getFullYear(),
                month = now.getMonth(),
                day = now.getDate();
            //var content = '<div class="year-input"><span>' + year + '年</span><i class="year-btn">&#xe600;</i><ul class="year-box" style="display:none;"></ul></div>';
            var content = '<div class="year-input"><span>' + year + '年</span><i class="select-year-btn">&#xe600;</i><ul class="year-select-box" style="display : none">';
            for (var i = 0; i < 150; i++) {
                content += '<li>' + (i + 1900) + '年</li>';
            }
            content += '</ul></div>' +
                '<div class="month-input"><i class="prev-month">&#xe601;</i><select class="months-options">'
            for (var i = 0; i < 12; i++) {
                content += '<option>' + (i + 1) + '月</option>';
            }
            content += '</select><i class="next-month">&#xe602;</i></div>' +
                '<div class="day-input"><i class="prev-day">&#xe601;</i><select class="days-options"></select>' +
                '<i class="next-day">&#xe602;</i></div>' +
                '<button class="today-btn">今天</button>' +
                '<div class="days-title">';
            var weekday = ['日', '一', '二', '三', '四', '五', '六'];
            for (var i = 0; i < 7; i++) {
                content += '<span class="day-title">' + weekday[i] + '</span>';
            }
            content += '</div>';
            ele.innerHTML = content;
            this.changeDateBar(now);

            // console.log('this.dateInput.value2:', this.dateInput.value);
            // console.log('inputValue2:', inputValue);
            var yearInput = ele.firstChild;
            yearInput.addEventListener('click', function() {
                var ul = this.lastChild;
                ul.style.display === 'none' || ul.style.display === 'none' ? ul.style.display = 'inline-block' : ul.style.display = 'none';
            });
            var yearBox = yearInput.lastChild;
            var yearLi = yearBox.children;
            for (var i = 0, len = yearLi.length; i < len; i++) {
                yearLi[i].onclick = function() {
                    _this.dateBar.date.setFullYear(this.innerText.slice(0, -1));
                    _this.changeDateBar(_this.dateBar.date);
                    // _this.changeDate(inputValue);
                };
            }
            var monthInput = yearInput.nextSibling;
            monthInput.firstChild.onclick = function() {
                var monthOptions = this.nextSibling;
                if (monthOptions.selectedIndex > 0) {
                    _this.dateBar.date.setMonth(--monthOptions.selectedIndex);
                } else {
                    monthOptions.selectedIndex = 11;
                    _this.dateBar.date.setFullYear(_this.dateBar.date.getFullYear() - 1);
                    _this.dateBar.date.setMonth(11);
                }
                _this.changeDateBar(_this.dateBar.date);
                // _this.changeDate(inputValue);
            };
            monthInput.lastChild.onclick = function() {
                var monthOptions = this.previousSibling;
                if (monthOptions.selectedIndex < 11) {
                    _this.dateBar.date.setMonth(++monthOptions.selectedIndex);
                } else {
                    monthOptions.selectedIndex = 0;
                    _this.dateBar.date.setFullYear(_this.dateBar.date.getFullYear() + 1);
                    _this.dateBar.date.setMonth(0);
                }
                _this.changeDateBar(_this.dateBar.date);
                // _this.changeDate(inputValue);
            }
            monthInput.children[1].onchange = function() {
                _this.dateBar.date.setMonth(this.selectedIndex);
                _this.changeDateBar(_this.dateBar.date);
                // _this.changeDate(inputValue);
            };

            var dayInput = monthInput.nextSibling;
            dayInput.firstChild.onclick = function() {
                var dayOptions = this.nextSibling;
                if (dayOptions.selectedIndex > 0) {
                    _this.dateBar.date.setDate(dayOptions.selectedIndex--);
                } else {
                    _this.dateBar.date.setMonth(_this.dateBar.date.getMonth() - 1);
                    _this.dateBar.date.setDate(_this.getDayOfMonth(_this.dateBar.date));
                }
                _this.changeDateBar(_this.dateBar.date);
                // _this.changeDate(inputValue);
            };
            dayInput.lastChild.onclick = function() {
                var dayOptions = this.previousSibling;
                if (dayOptions.selectedIndex < dayOptions.length - 1) {
                    dayOptions.selectedIndex++;
                    _this.dateBar.date.setDate(dayOptions.selectedIndex + 1);
                } else {
                    _this.dateBar.date.setDate(1);
                    _this.dateBar.date.setMonth(_this.dateBar.date.getMonth() + 1);
                }
                _this.changeDateBar(_this.dateBar.date);
                // _this.changeDate(inputValue);
            };
            dayInput.children[1].onchange = function() {
                _this.dateBar.date.setDate(this.selectedIndex + 1);
                _this.changeDateBar(_this.dateBar.date);
                // _this.changeDate(inputValue);
            };
            var todayBtn = dayInput.nextSibling;
            todayBtn.onclick = function() {
                _this.drawPicker(new Date());
                _this.changeDateBar(new Date());
                // _this.changeDate(inputValue);
            }
        },
        changeDateBar: function(date) {
            var yearInput = this.dateBar.firstChild,
                monthInput = yearInput.nextSibling,
                dayInput = monthInput.nextSibling;
            yearInput.firstChild.innerText = date.getFullYear() + '年';
            var monthOptions = monthInput.firstChild.nextSibling;
            monthOptions.selectedIndex = date.getMonth();
            var dayOptions = dayInput.firstChild.nextSibling;
            var days = this.getDaysOfMonth(date);
            var dayContent = '';
            for (var i = 1; i < days; i++) {
                dayContent += '<option>' + i + '日</option>';
            }
            dayOptions.innerHTML = dayContent;
            dayOptions.selectedIndex = date.getDate() - 1;
            this.drawPicker(date);
            // console.log(date)
        },
        getWeekByDay: function(val) {
            var week = new Date(Date.parse(val.replace(/\-/g, "/")));
            return week;
        },
        drawPicker: function(primalDate) {
            var date = new Date(primalDate); //要新建一个对象，因为会改变date
            var nowMonth = date.getMonth() + 1;
            var nowDate = date.getDate();
            var spanContainer = [];
            var dateBox = this.dateBox;
            dateBox.innerHTML = '';
            var time = date.getTime();
            var days = this.getDaysOfMonth(date); //计算出这个月的天数
            date.setDate(1); //将date的日期设置为1号
            var firstDay = date.getDay(); //知道这个月1号是星期几
            for (var i = 0; i < firstDay; i++) { //如果1号不是周日(一周的开头),则在1号之前要补全
                var tempDate = new Date(date);
                tempDate.setDate(i - firstDay + 1);
                var span = document.createElement("span");
                span.className = "unshow";
                spanContainer.push({ span: span, date: tempDate });
            }
            for (var i = 1; i <= days; i++) { //1号到这个月最后1天
                var span = document.createElement("span");
                span.className = 'show';
                spanContainer.push({ span: span, date: new Date(date) });
                date.setDate(i + 1);
            }
            for (var i = date.getDay(); i <= 6; i++) { //在这个月最后一天后面补全
                var span = document.createElement("span");
                span.className = "unshow";
                spanContainer.push({ span: span, date: new Date(date) });
                date.setDate(date.getDate() + 1);
            }
            for (var i = 0; i < spanContainer.length; i++) {
                var spanBox = spanContainer[i];
                var span = spanBox.span;
                span.year = spanBox.date.getFullYear(); //为每个span元素添加表示时间的属性
                span.month = spanBox.date.getMonth() + 1;
                span.date = spanBox.date.getDate();
                span.innerText = spanBox.date.getDate();
                if (span.date === nowDate && span.month === nowMonth) //如果这个span的日期为与传入的日期匹配，设置类名为select
                    span.className += " select";
                var _this = this;
                span.onclick = function() { //设置点击事件
                    var target = event.target;
                    var selected = target.parentElement.getElementsByClassName("select");
                    for (var i = 0; i < selected.length; i++) {
                        selected[i].className = selected[i].className.replace(" select", "");
                    };
                    target.className += " select";
                    //console.log(spanBox.date);   //这已经是闭包问题了
                    _this.changeDate(target.year, target.month, target.date); //陷阱 changeDate调用时spanContainer[i].date，i这个变量已经是出界了的
                    /*if(target.className.indexOf("unshow")!==-1){
                        parent.drawPicker(new Date(target.year, target.month-1, target.date)); //如果点击非本月的日期，则重绘日历表
                    }*/
                    _this.changeDateBar(new Date(target.year, target.month - 1, target.date));
                };
                dateBox.appendChild(span); //将span添加到dateBox中
            }
            //console.log(primalDate.toLocaleDateString()+'drawPicker');
            this.changeDate(primalDate.getFullYear(), primalDate.getMonth() + 1, primalDate.getDate())
            return;
        },
        getDaysOfMonth: function(primaryDate) {
            var date = new Date(primaryDate),
                month = date.getMonth(),
                time = date.getTime(),
                newTime = date.setMonth(month + 1);
            return Math.ceil((newTime - time) / (24 * 60 * 60 * 1000));
        },
        showCalendar: function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var value = target.value;
            var datePicker = this.datePicker;
            if (datePicker.style.display === 'none') {
                datePicker.style.display = 'block';
            } else {
                datePicker.style.display = 'none';
                return;
            }
            if (!value)
                this.toggleDateBar(this.dateBar);
        },
        changeDate: function(year, month, date) {
            this.dateInput.value = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? ("0" + date) : date);
        },
        setInput: function() {
            var value = this.dateInput.value;
            var year = value.slice(0, 4),
                month = value.slice(5, 7),
                day = value.slice(9);
            this.changeDateBar(new Date(year, month - 1, day));
        }
    };
    window.Calendar = Calendar;
})();