(module
  (memory (export "memory") 1)
  (func $partition (param $lo i32) (param $hi i32) (param $pivot i32) (result i32)

    (local $tmp i32)

    (loop $forever

      ;; increase lower bound
      (loop $while1
        (if
          (i32.lt_u (i32.load (get_local $lo)) (get_local $pivot))
          (then
            (set_local $lo (i32.add (get_local $lo) (i32.const 4)))
            (br $while1)
        )))

      ;; increase upper bound

      (loop $while2
        (if
        (i32.gt_u (i32.load (get_local $hi)) (get_local $pivot))
        (then
          (set_local $hi (i32.sub (get_local $hi) (i32.const 4)))
          (br $while2)
      )))

      ;; return if we are sorted

      (if
        (i32.ge_u (get_local $lo) (get_local $hi))
        (then (return (get_local $hi)))
      )

      ;; swap hi and lo

      (set_local $tmp (i32.load (get_local $hi)))
      (i32.store (get_local $hi) (i32.load (get_local $lo)) )
      (i32.store (get_local $lo) (get_local $tmp) )

;;      (br $forever)
    )

    (get_local $hi)
  )

  ;;(func $sort (param $ptr i32) (param $len i32)
  ;;  (local $mid i32)
  ;;  (if (i32.le_s (get_local $len) (i32.const 1)) (then (return)))

  ;;  (set_local $mid (i32.div_s (i32.const 2)))
  ;;)

  (export "partition" (func $partition))
)


















